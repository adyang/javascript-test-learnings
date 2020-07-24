# Javascript Test Learnings

This repo is created to learn about testing (and integration testing) in Javascript using Jest.

## Branches
There are 2 branches:
1. `master`: contains implementation only, no tests
2. `with-test`: contains both implementation and tests

## Modules
The `async`, `math` and `temperature` modules contain mostly unit testable examples without external dependencies.

The `shop` module requires PostgreSQL and is the example for integration tests.

## Prerequisites
* Node.js - Tested on 12.18.0
* PostgreSQL - Tested on 12.3

## Setup (`shop`)
1. Create `<oroject-dir>/.env.local` file with local PostgreSQL credentials:
    ```
    SHOP_DB_SUPERUSER=your_superuser
    SHOP_DB_SUPERUSER_PASSWORD=
    ```
    The user needs to have permission to create databases.
2. Ensure PostgreSQL is started.
3. Setup users, development database, migrations and seed data:
    ```console
    npm install
    npm run shop:setup
    ```

    This will create 2 PostgreSQL users:
    * `shop`: app user with read-write permissions
    * `shop_admin`: admin and owner of the `shop_development` database

    These users will also be used in the tests as the app user and to create test databases respectively.

    The `shop:setup` command will also create a database named `shop_development` with some seed data.

## Run Individual Module App
The following commands can be used to run each individual module app:
```
npm run math
npm run async
npm run temperature
npm run shop
```

In addition, since the `npm run shop` command starts a web server, the following HTTP requests can be made:
* GET /users
    ```console
    curl localhost:3000/users
    ```
* POST /users
    ```console
    curl -X POST localhost:3000/users \
    --data '{"username": "dan", "name": "Dan Dangerous"}' \
    --header 'Content-Type: application/json' \
    ```
* GET /purchases/:username
    ```console
    curl localhost:3000/purchases/alice
    ```
* GET /recommendations/:username
    ```console
    curl localhost:3000/recommendations/alice
    ```

## Testing
1. Checkout `with-test` branch:
    ```console
    git checkout with-test
    ```
2. Ensure dev dependencies are installed:
    ```console
    npm install
    ```
3. Run tests:
    * All tests: `npm test`
    * Unit tests only: `npm run test:unit`
    * Integration tests only: `npm run test:integration`

Note that for the integration tests, in order to support parallel execution, `shop_test_${n}` databases would be created where `n` is the jest `maxWorkers` setting. Also, a `shop_test_template` database is created to speed up creation of all the test databases.
