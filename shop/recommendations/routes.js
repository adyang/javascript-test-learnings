const express = require('express');
const router = express.Router();
const purchases = require('../purchases/purchases');
const recommendations = require('./recommendations');

const monthlyItems = {
  'brown': 'chocolate',
  'pink': 'sakura',
  'black': 'coffee',
  'yellow': 'sunflower'
}

router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  purchases.findByUsername(username)
    .then(purchases => recommendations.recommend(purchases, monthlyItems))
    .then(rec => res.json({ recommendation: rec }))
    .catch(next);
});

module.exports = router;
