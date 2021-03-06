const pick = require('lodash.pick');

const { User } = require('../models/User');
const { authenticate } = require('../middleware/authenticate');

module.exports = app => {
  //User sign-up route
  app.post('/users', (req, res) => {
    const body = pick(req.body, ['email', 'password']);
    const user = new User(body);

    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.send({ id: user._id, email: user.email, token })
      })
      .catch(err => {
        if (err.code === 11000) {
          return res.status(409).send({ message: 'username/email taken' })
        }
        res.sendStatus(500);
      });
  });
  //User authentication route
  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });
  //User login route
  app.post('/users/login', (req, res) => {
    const body = pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.send({ id: user._id, email: user.email, token })
        });
      })
      .catch(err => {
        res.status(401).send(err);
      });
  });

  app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(
      () => {
        res.status(200).send();
      },
      () => {
        res.status(400).send();
      },
    );
  });
};