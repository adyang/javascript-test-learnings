process.env.SHOP_DB_DATABASE = `${process.env.SHOP_DB_DATABASE_PREFIX}_${process.env.JEST_WORKER_ID}`
require('dotenv-flow').config({ silent: true });

const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async () => {
    await db.query('TRUNCATE users, purchases CASCADE');
});

describe('recommendations', () => {
    test('get recommendation by user', async () => {
        const username = 'alice';
        await db.query("INSERT INTO users (username, name) VALUES ($1, 'Alice Ant')", [username]);
        await db.query("INSERT INTO purchases (user_id, item, colour) VALUES "
            + "((SELECT id FROM users WHERE username = $1), 'book', 'brown'),"
            + "((SELECT id FROM users WHERE username = $1), 'cup', 'brown')", [username]);
        
        const response = await request(app)
            .get(`/recommendations/${username}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ recommendation: 'chocolate' });
    });
});

afterAll(async () => {
    await db.end();
});
