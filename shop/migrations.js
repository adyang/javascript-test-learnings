async function migrate(db, user) {
    await setupPrivileges(db, user);
    await setupTables(db);
}

async function setupPrivileges(db, user) {
    await db.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${user}`);
}

async function setupTables(db) {
    await db.query('CREATE TABLE IF NOT EXISTS users (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, username VARCHAR NOT NULL UNIQUE, name VARCHAR)');
    await db.query('CREATE TABLE IF NOT EXISTS purchases (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users, item VARCHAR, colour VARCHAR)');
}

async function seed(db) {
    await db.query("INSERT INTO users (username, name) VALUES ('alice', 'Alice Ant'), ('bob', 'Bob Boss'), ('charlie', 'Charlie Charm') ON CONFLICT DO NOTHING");
    await db.query(`
        INSERT INTO purchases (user_id, item, colour)
        SELECT u.id, v.item, v.colour
        FROM (
            VALUES
            (VARCHAR 'alice', VARCHAR 'book', VARCHAR 'brown'),
            ('alice', 'bag', 'brown'),
            ('alice', 'cup', 'pink'),
            ('alice', 'monitor', 'black'),
            ('bob', 'phone holder', 'yellow'),
            ('charlie', 'power bank', 'black')
        ) v (username, item, colour)
        LEFT JOIN users u USING (username);`);
}

module.exports = {
    migrate,
    seed
}
