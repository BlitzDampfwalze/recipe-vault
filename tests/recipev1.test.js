require('../config/config');
console.log(process.env.MONGODB_URI_LIVE);

const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');


const { app } = require('../server');
const { Recipe } = require('../models/Recipe');
const { User } = require('../models/User');
// const { recipes, populateRecipes, users, populateUsers } = require('./seed/seed')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true });

//create new user and login user test, then you can add recipes/post to this user

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = {
  _id: userOneId,
  email: 'test@gmail.com',
  password: 'asdf123',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
  }]
};


const recipes = [
  {
    userID: userOneId,
    dishType: "dessert",
    ingredients: ["flour", "water", "apples"],
    instructions: "instructions alsdjflasdf",
    readyInMinutes: 20,
  },
  {
    userID: userOneId,
    dishType: "main course",
    ingredients: ["seasoning", "meat", "stuff"],
    instructions: "instructions alsdsdf",
    readyInMinutes: 30,
  }]

beforeEach((done) => {
  User.deleteMany({}).then(() => {
    const userOne = new User(users).save();
    // const userTwo = new User(users[1]).save();

    return Promise.all([userOne])
  }).then(() => done());
});

beforeEach((done) => {
  Recipe.deleteMany({}).then(() => {
    Recipe.insertMany(recipes);
  }).then(() => done());
});

describe('POST /recipes', () => {
  it.only('should create new recipe', (done) => {

    const newRecipe = {
      userID: userOneId,
      title: "pies",
      dishType: "dessert",
      ingredients: ["flour", "water", "apples"],
      instructions: "instructions alsdjflasdf",
      readyInMinutes: 20,
      servings: 6,
      source: 'website'
    }

    request(app)
      .post('/recipes')
      .send(newRecipe)
      .expect(200)
      .expect((res) => {
        // console.log('response:', res);
        // expect(res.body._id).toBe(`${ObjectID}`);
        expect(res.body.dishType).toBe('dessert');
        expect(res.body.ingredients.length).toBe(3);
        expect(res.body.instructions).toBe('instructions alsdjflasdf');
        expect(res.body.readyInMinutes).toBe(20);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        Recipe.find().then(recipes => {
          expect(recipes.length).toBe(3);
          expect(recipes[0].dishType).toBe(newRecipe.dishType);
          expect(recipes[0].ingredients.length).toBe(newRecipe.ingredients.length);
          expect(recipes[0].instructions).toBe(newRecipe.instructions);
          expect(recipes[0].readyInMinutes).toBe(newRecipe.readyInMinutes);
          done();
        }).catch((err) => done(err));
      });
  })

  // it('should not create recipe with invalid body data', (done) => {
  //   request(app)
  //     .post('/recipes')
  //     .send({})
  //     .expect(400)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //     Recipe.find().then((recipes) => {
  //       expect(recipes.length).toBe(2);
  //       done();
  //     }).catch((e) => done(e));
  //     });
  // });
})

// describe('GET /recipes', () => {
//   it('should get all recipes', (done) => {
//     request(app)
//       .get('/recipes')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.recipes.length).toBe(2);
//       })
//       .end(done);
//   });
// });


describe('GET /recipes', () => {
  it('should get all recipes', (done) => {
    request(app)
      .get('/recipes')
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /recipes/:id', () => {
  it('should return recipe doc', (done) => {
    request(app)
      .get(`/recipes/${recipes[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipe.title).toBe(recipes[0].title);
      })
      .end(done);
  });

  it('should return 404 if recipe not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/recipes/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/recipes/123abc')
      .expect(404)
      .end(done);
  });
});