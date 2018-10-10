const _ = {
  pick: require('lodash.pick'),
  isboolean: require('lodash.isboolean')
};

const { ObjectID } = require('mongodb');
const { Recipe } = require('../models/Recipe');
const { authenticate } = require('../middleware/authenticate');

module.exports = app => {
  app.post('/recipes', authenticate, (req, res) => {
    console.log(req.body);

    const recipe = new Recipe({
      userID: req.user._id,
      title: req.body.title,
      dishType: req.body.dishType,
      ingredients: req.body.ingredients, 
      instructions: req.body.instructions,
      readyInMinutes: req.body.readyInMinutes,
      image: req.body.image,
      servings: req.body.servings,
      source: req.body.source
    });

    recipe.save().then(recipe => { 
      res.send(recipe); 
    })
    .catch(err => { res.status(500).send(err) });
  });

  app.put('/recipes/:id', authenticate, (req, res) => {
    console.log(req.body);

    Recipe.findOneAndUpdate(
      {_id: req.params.id, userID: req.user._id},
      {
        title: req.body.title,
        dishType: req.body.dishType,
        ingredients: req.body.ingredients, 
        instructions: req.body.instructions,
        readyInMinutes: req.body.readyInMinutes,
        image: req.body.image,
        servings: req.body.servings,
        source: req.body.source
      }
    ).then(recipe => { 
      res.send(recipe); 
    })
    .catch(err => { res.status(500).send(err) });
  });

  app.get('/recipes', authenticate, (req, res) => {
    Recipe.find({userID:req.user._id}).then((recipes) => { 
      res.send({recipes}) 
    }) //{} syntax vs res.json(...map etc.)
    .catch(err => { res.status(500).send(err) });
  });

  app.get('/recipes/:id', authenticate, (req, res) => {

    if(!ObjectID.isValid(req.params.id)) {
      return res.sendStatus(404);
    }

    Recipe.findById(req.params.id).then(recipe => {
        if(!recipe) {
          return res.sendStatus(404);
        }
        res.send({recipe});
        })
        .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong'});
      });
  });

  app.delete('/recipes/:id', authenticate, (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
      return res.status(404).send('Invalid ID');
    }

    Recipe.findByIdAndRemove(req.params.id)
    // .then((recipe) => { 
    //   if (!recipe) { return res.status(404).send();}
    //   res.send(recipe);}).catch((err) => {res.status(400).send();});
    .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong'});
      });
    });

    // app.patch ('/recipes/:id', authenticate, (req, res) => {
    //   const id = req.params.id;

    //   if (!ObjectID.isValid(id)) {
    //     return res.status(400).send('Invalid ID');
    //   }

    //   Recipe.findOneAndUpdate(
    //     {_id: id, userID: req.user._id},
    //     { $set: body },
    //     { new: true},
    //   )
    //   .then(recipe => {
    //     if (!recipe) {
    //       return res.status(404).send('Not Found');
    //     }

    //     res.send({ recipe });
    //   })
    //   .catch(err => {
    //     res.status(400).send(err);
    //   });
    // });


}