const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ingredientSchema = new Schema({
  name: String,
  price: Number,
  calories: Number,
  isVegetarian: Boolean,
}, {
  timestamps: true,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);


module.exports = Ingredient;
