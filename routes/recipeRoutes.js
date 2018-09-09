const { ObjectID } = require('mongodb');
const { Recipe } = require('../models/Recipe');

module.exports = app => {
  app.post('/recipes',(req, res) => {
    console.log(req.body);
    const recipe = new Recipe({
      instructions: req.body.instructions, //text: req.body.text, etc
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