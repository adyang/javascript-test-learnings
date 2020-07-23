require('dotenv-flow').config({
    node_env: 'test',
    silent: true
});
const { Client } = require('pg');
const migrations = require('../migrations');

const TEMPLATE_DATABASE = `${process.env.SHOP_DB_DATABASE_PREFIX}_template`;

async function setupAllWorkerDatabases({ maxWorkers }) {
    const bootstrapDb = createConnection(process.env.SHOP_DB_BOOTSTRAP_DATABASE);
    await bootstrapDb.connect();

    try {
        await createDatabase(bootstrapDb, TEMPLATE_DATABASE);
        await setupTemplateDatabase(TEMPLATE_DATABASE, process.env.SHOP_DB_USER);

        for (let i = 1; i <= maxWorkers; i++)
            await createDatabase(bootstrapDb, `${process.env.SHOP_DB_DATABASE_PREFIX}_${i}`, TEMPLATE_DATABASE);
    } finally {
        await bootstrapDb.end();
    }
}

function createConnection(database) {
    return new Client({
        host: process.env.SHOP_DB_HOST,
        port: process.env.SHOP_DB_PORT,
        database,
        user: process.env.SHOP_DB_ADMIN,
        password: process.env.SHOP_DB_ADMIN_PASSWORD
    });
}

async function createDatabase(db, name, template = 'DEFAULT') {
    await db.query(`DROP DATABASE IF EXISTS ${name}`);
    await db.query(`CREATE DATABASE ${name} TEMPLATE ${template}`);
}

async function setupTemplateDatabase(database, user) {
    const templateDb = createConnection(database);
    await templateDb.connect();
    try {
        await templateDb.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT TRUNCATE ON TABLES TO ${user}`);
        await migrations.migrate(templateDb, user);
        await migrations.seed(templateDb);
        
    } finally {
        await templateDb.end();
    }
}

module.exports = setupAllWorkerDatabases;
