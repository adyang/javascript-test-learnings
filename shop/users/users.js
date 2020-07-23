const db = require('../db');

async function findAll() {
    const { rows } = await db.query('SELECT * FROM users');
    return rows.map(({ id, ...user }) => user);
}

async function create({ username, name }) {
    const insert = 'INSERT INTO users (username, name) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING username, name';
    const { rows } = await db.query(insert, [username, name]);
    if (rows.length === 0)
        throw { type: 'DuplicateRecord', message: `username=${username} already exists.` };
    return rows[0];
}

module.exports = {
    findAll,
    create
}