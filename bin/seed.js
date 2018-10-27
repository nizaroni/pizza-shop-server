const mongoose = require('mongoose');
require('dotenv').config();

const Ingredient = require('../models/ingredient.js');

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const ingredients = [
  {
    name: 'Pepperoni',
    price: 3,
    calories: 494,
    isVegetarian: false,
  }, {
    name: 'Mushrooms',
    price: 1,
    calories: 22,
    isVegetarian: true,
  }, {
    name: 'Onions',
    price: 1,
    calories: 40,
    isVegetarian: true,
  }, {
    name: 'Mozzarella',
    price: 3,
    calories: 100,
    isVegetarian: false,
  }, {
    name: 'Ham',
    price: 2,
    calories: 145,
    isVegetarian: false,
  }
];

Ingredient.create(ingredients)
  .then(results => {
    console.log(`Created ${results.length} ingredients.`);
    mongoose.disconnect();
  })
  .catch(err => { throw err });
