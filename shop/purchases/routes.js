const express = require('express');
const router = express.Router();
const purchases = require('./purchases');

router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  purchases.findByUsername(username)
    .then(purchases => res.json(purchases))
    .catch(next);
});

module.exports = router;
