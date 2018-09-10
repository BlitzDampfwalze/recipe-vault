const { ObjectID } = require('mongodb');
const { Recipe } = require('../models/Recipe');

module.exports = app => {
  app.post('/recipes',(req, res) => {
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
    const id = req.params.id;
    if (!ObjectID.isValid(id)) { 
      return res.status(400).send('Invalid ID');
    }
    Recipe.findOne({
      _id: id,
    })
      .then(recipe => { 
        if (!recipe) {
          return res.status(404).send('Not Found');
        }
        res.send({recipe});
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  app.delete('.recipes/:id', (req. res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
      return res.status(400).send('Invalid ID');
      }
    
      Recipe.findOneAndRemove({
        _id: id,
        _creator: req.user._id,
      })
        .then(recipe => {
          if (!recipe) {
            return res.status(404).send('Not found');            
          }

          res.send({recipe});
        })
        .catch(err => {
          res.status(400).send(err);
        });
  });

  // Thinkful's Example (difference?):
  // app.get('/posts/:id', (req, res) => {
  //   BlogPost
  //     .findById(req.params.id)
  //     .then(post => res.json(post.serialize()))
  //     .catch(err => {
  //       console.error(err);
  //       res.status(500).json({ error: 'something went horribly awry' });
  //     });
  // });




}