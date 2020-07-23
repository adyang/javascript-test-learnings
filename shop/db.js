const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.SHOP_DB_HOST,
    port: process.env.SHOP_DB_PORT,
    database: process.env.SHOP_DB_DATABASE,
    user: process.env.SHOP_DB_USER,
    password: process.env.SHOP_DB_PASSWORD
});

module.exports = pool;
