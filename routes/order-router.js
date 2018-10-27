const express = require('express');

const Ingredient = require('../models/ingredient.js');
const Order = require('../models/order.js');

const router = express.Router();


router.get('/ingredients', (req, res, next) => {
  Ingredient.find()
    .then(ingredients => res.json(ingredients))
    .catch(next);
});


router.post('/orders', (req, res, next) => {
  if (!req.user) {
    next(new Error('Must be logged in to order. 💩'));
    return;
  }

  const { size, ingredients } = req.body;

  Ingredient.find({ _id: ingredients })
    .then(ingredients => {
      const { _id } = req.user;
      const total = ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        prices[size]
      );

      return Order.create({ size, ingredients, total, owner: _id });
    })
    .then(order => res.json(order))
    .catch(next);
});

const prices = {
  small: 8,
  medium: 11,
  large: 14,
};


router.get('/orders', (req, res, next) => {
  if (!req.user) {
    next(new Error('Must be logged in to order. 💩'));
    return;
  }

  const { _id } = req.user;
  Order.find({ owner: _id })
    .populate('ingredients')
    .sort({ createdAt: -1 })
    .then(orders => res.json(orders))
    .catch(next);
});


module.exports = router;
