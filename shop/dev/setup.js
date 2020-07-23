require('dotenv-flow').config({
    node_env: 'development',
    silent: true
});
const { Client } = require('pg');
const migrations = require('../migrations');

main()

async function main() {
    const bootstrapDb = createConnection(process.env.SHOP_DB_BOOTSTRAP_DATABASE, process.env.SHOP_DB_SUPERUSER, process.env.SHOP_DB_SUPERUSER_PASSWORD);
    await bootstrapDb.connect();

    try {
        await createUserIfNotExists(bootstrapDb, process.env.SHOP_DB_ADMIN, 'CREATEDB');
        await createUserIfNotExists(bootstrapDb, process.env.SHOP_DB_USER);
        await createDatabaseIfNotExists(bootstrapDb, process.env.SHOP_DB_DATABASE, process.env.SHOP_DB_ADMIN);
        await setupShopDatabase(process.env.SHOP_DB_DATABASE, process.env.SHOP_DB_ADMIN, process.env.SHOP_DB_ADMIN_PASSWORD, process.env.SHOP_DB_USER);
    } catch (e) {
        console.error(e);
    } finally {
        await bootstrapDb.end();
    }
}

async function createUserIfNotExists(db, user, ...privileges) {
    await db.query(`
        DO $$
        BEGIN
           IF NOT EXISTS (
              SELECT FROM pg_catalog.pg_roles WHERE rolname = '${user}') THEN
              CREATE ROLE ${[user, ...privileges].join(' ')} LOGIN;
           END IF;
        END
        $$;`);
}

async function createDatabaseIfNotExists(db, name, owner) {
    const { rows } = await db.query('SELECT EXISTS(SELECT * FROM pg_catalog.pg_database WHERE datname = $1)', [name]);
    if (!rows[0].exists)
        await db.query(`CREATE DATABASE ${name} OWNER ${owner}`);
}

async function setupShopDatabase(database, admin, adminPassword, user) {
    const shopDb = createConnection(database, admin, adminPassword);
    await shopDb.connect();
    try {
        await migrations.migrate(shopDb, user);
        await migrations.seed(shopDb);
    }
    finally {
        await shopDb.end();
    }
}

function createConnection(database, user, password) {
    return new Client({
        host: process.env.SHOP_DB_HOST,
        port: process.env.SHOP_DB_PORT,
        database,
        user: user,
        password: password
    });
}
