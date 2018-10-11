// const expect = require('expect');
// const request = require('supertest');
const expect = require('chai').expect;
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Recipe } = require('../models/Recipe');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const recipes = [
  {
    // _id: new ObjectID(),
    dishTypes: "dessert",
    ingredients: ["flour", "water", "apples"],
    instructions: "instructions alsdjflasdf",
    readyInMinutes: 20,
  },
  {
    // _id: new ObjectID(),
    dishTypes: "main course",
    ingredients: ["seasoning", "meat", "stuff"],
    instructions: "instructions alsdsdf",
    readyInMinutes: 30,
  }]

beforeEach((done) => {
  Recipe.remove({}).then(() => {
    Recipe.insertMany(recipes);
  }).then(() => done());
});


describe('POST /recipes', () => {
  it.only('should create new recipe', () => {

    const newRecipe = {
      // _id: new ObjectID(),
      dishTypes: "dessert",
      ingredients: ["flour", "water", "apples"],
      instructions: "instructions alsdjflasdf",
      readyInMinutes: 20,
    }

    chai.request(app)
      .post('/recipes')
      .send(newRecipe)
      .then(function (err, res) {
        console.log("line 51", newRecipe);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      })
      .catch(err => console.log({ err }));
  })
  //     .expect(200)
  //     .expect((res) => {
  //       // expect(res.body._id).toBe(`${ObjectID}`);
  //       expect(res.body.dishTypes).toBe('dessert');
  //       expect(res.body.ingredients.length).toBe(3);
  //       expect(res.body.instructions).toBe('instructions alsdjflasdf');
  //       expect(res.body.readyInMinutes).toBe(20);
  //     })
  //     .end(err => {
  //       if(err) {
  //         return done(err);
  //       }

  //     Recipe.find().then(recipes => {
  //       expect(recipes.length).toBe(3);
  //       expect(recipes[0].dishTypes).toBe(newRecipe.dishTypes);
  //       expect(recipes[0].ingredients.length).toBe(newRecipe.ingredients.length);
  //       expect(recipes[0].instructions).toBe(newRecipe.instructions);
  //       expect(recipes[0].readyInMinutes).toBe(newRecipe.readyInMinutes);
  //       done();
  //     }).catch((err) => done(err));
  //   });
  // })

  //////////////////////////////////////
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
/////////////////////////////////////

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

// describe('GET /recipes/:id', () => {
//   it('should return recipe doc', (done) => {
//     request(app)
//     .get(`/recipes/${recipes[0]._id.toHexString()}`)
//     .expect(200)
//     .expect((res) => {
//       expect(res.body.recipe.title).toBe(recipes[0].title);
//     })
//     .end(done);
//   });

//   it('should return 404 if recipe not found', (done) => {
//     const hexId = new ObjectID().toHexString();

//     request(app)
//       .get(`/recipes/${hexId}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return 404 for non-object ids', (done) => {
//     request(app)
//       .get('/recipes/123abc')
//       .expect(404)
//       .end(done);
//   });
// });


// describe('GET /users/me', () => {
//   it('should return user if authenticated', (done) => {
//     request(app)
//     .get('/users/me')
//     .set('x-auth', users[0].tokens[0].token)
//     .expect(200)
//     .expect((res) => {
//       expect(res.body._id).toBe(users[0]._id.toHexString());
//       expect(res.body.email).toBe(users[0].email);
//     })
//     .end(done);
//   });

//   it('should return 401 if not authenticated', (done) => {

//   })
// })