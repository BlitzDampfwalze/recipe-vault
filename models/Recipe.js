const mongoose = require('mongoose');

// const recipeSchema = new mongoose.Schema(
//   {
//     userID: { required: true, type: mongoose.Schema.Types.ObjectId, index: true },
//     title: { type: String, required: true },
//     dishType: { type: String, required: true },
//     ingredients: [String],
//     instructions: { type: String, required: true },
//     readyInMinutes: { type: Number, required: true },
//     servings: { type: Number, require: true },
//     source: { type: String, required: true },
//     created: { type: Date, default: Date.now }
//   }
// );

const recipeSchema = new mongoose.Schema(
  {
    userID: { required: false, type: mongoose.Schema.Types.ObjectId, index: true },
    title: { type: String, required: false },
    dishType: { type: String, required: false },
    ingredients: [String],
    readyInMinutes: { type: Number, required: false },
    servings: { type: Number, require: false },
    source: { type: String, required: false },
    created: { type: Date, default: Date.now }
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = { Recipe };

// The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.