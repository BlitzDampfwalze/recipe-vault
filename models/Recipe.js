const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    ingredients: [String], 
    instructions: {type: String},
    settings: [String], 
    author: {type: String},
    created: {type: Date, default: Date.now}
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = { Recipe };