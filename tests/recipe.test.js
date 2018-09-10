const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Recipe} = require('../models/Recipe');

beforeEach((done) => {
  Recipe.remove({}).then(() => done());
});

describe('POST /recipes', () => {
  it('should create new recipe', (done) => {
    
    const newRecipe = {
      dishTypes: "dessert",
      ingredients: ["flour", "water", "apples"], 
      instructions: "instructions alsdjflasdf",
      readyInMinutes: 20,
    }

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