const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    userID: { required: true, type: mongoose.Schema.Types.ObjectId, index: true },
    title: String,
    dishType: String,
    ingredients: [String],
    instructions: String,
    readyInMinutes: Number,
    image: String,
    servings: Number,
    source: String,
    created: { type: Date, default: Date.now }
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = { Recipe };

// The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.