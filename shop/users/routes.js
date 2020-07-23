const express = require('express');
const router = express.Router();
const users = require('./users');

router.get('/', (req, res, next) => {
  users.findAll()
    .then(users => res.json(users))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { username, name } = req.body;
  users.create({ username, name })
    .then(user => res.status(201).json(user))
    .catch(err => {
      switch (err.type) {
        case 'DuplicateRecord':
          return res.status(409).send({ error: err.message });
        default:
          next(err);
      }
    });
});

module.exports = router;
