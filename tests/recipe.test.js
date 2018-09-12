const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Recipe} = require('../models/Recipe');

beforeEach((done) => {
  Recipe.remove({}).then(() => done());
});

describe('POST /recipes', () => {
  it('should create new recipe', (done) => {
    
    const newRecipe = [
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
    }]

    request(app)
      .post('/recipes')
      .send({newRecipe})
      .expect(200)
      .expect((res) => {
        expect(res.body.newRecipe).toBe(newRecipe);
      })
      .end(err => {
        if(err) {
          return done(err);
        }

      Recipe.find({newRecipe}).then(recipes => {
        expect(recipes.length).toBe(1);
        expect(recipes[0].newRecipe).toBe(newRecipe);
        console.log("console logging text here:", newRecipe);
        done();
      }).catch((err) => done(err));
    });
  });
});

describe('GET /recipes', () => {
  it('should get all recipes', (done) => {
    request(app)
      .get('/recipes')
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /recipes/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/recipes/${recipes[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.recipe.title).toBe(recipes[0].title);
    })
    .end(done);
  });
});