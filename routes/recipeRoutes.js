// const _ = {
//   pick: require('lodash.pick'),
//   isboolean: require('lodash.isboolean')
// };

const { ObjectID } = require('mongodb');
const { Recipe } = require('../models/Recipe');
// const { authenticate } = require('../middleware/authenticate');

module.exports = app => {
  app.post('/recipes', (req, res) => {
    console.log(req.body);

    const recipe = new Recipe({
      title: req.body.title,      
      dishTypes: req.body.dishTypes,
      ingredients: req.body.ingredients, 
      instructions: req.body.instructions,
      readyInMinutes: req.body.readyInMinutes,
      image: req.body.image,
      servings: req.body.servings,
      source: req.body.source,
      settings: req.body.settings,
    });

    recipe.save()
    .then(recipe => { res.send(recipe) })
    .catch(err => { res.status(400).send(err) });
  });

  app.get('/recipes', (req, res) => {
    Recipe.find()
    .then((recipes) => { res.send({recipes}) }) //{} syntax vs res.json(...map etc.)
    .catch(err => { res.status(400).send(err) });
  });

  app.get('/recipes/:id', (req, res) => {

    if(!ObjectID.isValid(req.params.id)) {
      return res.sendStatus(404);
    }

    Recipe
        .findById(req.params.id).then(recipe => {
        if(!recipe) {
          return res.sendStatus(404);
        }
        res.send({recipe});
        })
        .catch(err => {
        console.error(err);
        res.status(400).json({error: 'something went wrong'});
      });
  });

  app.delete('/recipes/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send('Invalid ID');
    }

    Recipe
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json({error: 'something went wrong'});
      });
    });








}