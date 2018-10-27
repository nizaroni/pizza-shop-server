const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: { type: Number, required: true },
  size: {
    type: String,
    enum: [ 'small', 'medium', 'large' ]
  },
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;
