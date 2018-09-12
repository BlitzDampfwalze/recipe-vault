const pick = require('lodash.pick'); //discuss

const { User } = require('..models/User');
const { authenticate } = require('../middleware/authenticate');

module.exports = app => {
  app.post('/users', (req, res) => {
    const body = pick(req.body, ['email', 'password']);
    const user = new User(body);

    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.header('x-auth', token).send(user);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });

  app.post('/users/login', (req, res) => {
    const body = pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header('x-auth', token).send(user);
        });
      })
      .catch(err => {
        res.status(400).send(err);
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
