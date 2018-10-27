const express = require('express');

const Ingredient = require('../models/ingredient.js')

const router = express.Router();


router.get('/ingredients', (req, res, next) => {
  Ingredient.find()
    .then(ingredients => res.json(ingredients))
    .catch(next);
});


module.exports = router;
