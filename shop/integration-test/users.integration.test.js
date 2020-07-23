process.env.SHOP_DB_DATABASE = `${process.env.SHOP_DB_DATABASE_PREFIX}_${process.env.JEST_WORKER_ID}`
require('dotenv-flow').config({ silent: true });

const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async () => {
    await db.query('TRUNCATE users CASCADE');
});

describe('users', () => {
    test('get all users', async () => {
        await db.query("INSERT INTO users (username, name) VALUES" 
            + "('alice', 'Alice Ant'),"
            + "('bob', 'Bob Boss'),"
            + "('charlie', 'Charlie Charm')");
        
        const response = await request(app)
            .get('/users');
        
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([
            {username: 'alice', name: 'Alice Ant'},
            {username: 'bob', name: 'Bob Boss'},
            {username: 'charlie', name: 'Charlie Charm'}
        ]);
    });

    test('create new user', async () => {
        const user = { username: 'dan', name: 'Dan Dangerous' };
        
        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(user);
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [user.username])
        expect(rows[0]).toMatchObject(user);
    });

    test('create new user, when username already exists', async () => {
        await db.query("INSERT INTO users (username, name) VALUES ('eve', 'Eve Ever')");
        
        const response = await request(app)
            .post('/users')
            .send({username: 'eve', name: 'Eve Duplicate'});

        expect(response.status).toBe(409);
        expect(response.body.error).toMatch('username=eve already exists');
    });
});

afterAll(async () => {
    await db.end();
});
