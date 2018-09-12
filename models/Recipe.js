const mongoose = require('mongoose');

// const ingredientsSchema = new mongoose.Schema(
//   {
//     name: String,
//     amount: Number,
//     unit: String,
//   }
// )

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    dishTypes: String,
    ingredients: [String], 
    instructions: String,
    readyInMinutes: Number,
    image: String,
    servings: Number,
    source: String,
    created: {type: Date, default: Date.now}
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = { Recipe };