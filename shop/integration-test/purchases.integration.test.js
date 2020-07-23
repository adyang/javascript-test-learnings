process.env.SHOP_DB_DATABASE = `${process.env.SHOP_DB_DATABASE_PREFIX}_${process.env.JEST_WORKER_ID}`
require('dotenv-flow').config({ silent: true });

const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async () => {
    await db.query('TRUNCATE users, purchases CASCADE');
});

describe('purchases', () => {
    test('get all purchases by user', async () => {
        const username = 'alice';
        await db.query("INSERT INTO users (username, name) VALUES ($1, 'Alice Ant')", [username]);
        await db.query("INSERT INTO purchases (user_id, item, colour) VALUES "
            + "((SELECT id FROM users WHERE username = $1), 'book', 'brown'),"
            + "((SELECT id FROM users WHERE username = $1), 'cup', 'pink'),"
            + "((SELECT id FROM users WHERE username = $1), 'monitor', 'black')", [username]);
        
        const response = await request(app)
            .get(`/purchases/${username}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([
            {item: 'book', colour: 'brown'},
            {item: 'cup', colour: 'pink'},
            {item: 'monitor', colour: 'black'}
        ]);
    });
});

afterAll(async () => {
    await db.end();
});
