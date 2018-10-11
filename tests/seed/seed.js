const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Recipe} = require('./../../models/Recipe');
const { User } = require('./../../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'tester@example.com',
    password: 'user1Pass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'tester2@example.com',
    password: 'user2Pass'
  }
]

const recipes = [
  {
    _id: new ObjectID(),
    dishTypes: "dessert",
    ingredients: ["flour", "water", "apples"],
    instructions: "instructions alsdjflasdf",
    readyInMinutes: 20,
  },
  {
    _id: new ObjectID(),
    dishTypes: "main course",
    ingredients: ["seasoning", "meat", "stuff"],
    instructions: "instructions alsdsdf",
    readyInMinutes: 30,
  }
]

const populateRecipes = (done) => {
  Recipe.remove({}).then(() => {
    return Recipe.insertMany(recipes);
  }).then(()=> done());
};

const populateUsers = (done) => {
  //pass in an empty object to remove all records
  //
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(()=> done());
};

module.exports = {recipes, populateRecipes, users, populateUsers}