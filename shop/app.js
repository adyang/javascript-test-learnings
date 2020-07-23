const express = require('express');
const bodyParser = require('body-parser');

const users = require('./users/routes');
const purchases = require('./purchases/routes');
const recommendations = require('./recommendations/routes');

const app = express();

app.use(bodyParser.json());

app.use('/users', users);
app.use('/purchases', purchases);
app.use('/recommendations', recommendations);

module.exports = app;
