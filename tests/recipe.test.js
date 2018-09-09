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
      
    }

    request(app)
      .post('/recipes')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end(err => {
        if(err) {
          return done(err);
        }

      Recipe.find({text}).then(recipes => {
        expect(recipes.length).toBe(1);
        expect(recipes[0].text).toBe(text);
        console.log("console logging text here:", text);
        done();
      }).catch((err) => done(err));
    });
  });
});