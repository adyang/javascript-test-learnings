const db = require('../db');

async function findByUsername(username) {
    const { rows } = await db.query('SELECT purchases.* FROM purchases INNER JOIN users ON purchases.user_id = users.id WHERE users.username = $1', [username]);
    return rows.map(({ id, user_id, ...purchase }) => purchase);
}

module.exports = {
    findByUsername
}
