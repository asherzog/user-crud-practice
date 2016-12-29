const express = require('express');
const bcrypt = require('bcrypt');


const router = express.Router();

const User = require('../db/query');


router.get('/', (req, res) => {
  res.json({
    message: '👏'
  });
});


function validUser(user) {
  const validEmail = typeof user.email == 'string' &&
                      user.email.trim() != '';
  const validPassword = typeof user.password == 'string' &&
                       user.password.trim() != '' &&
                       user.password.trim().length >= 6;
  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 8)
            .then(hash => {
              const user = {
                email: req.body.email,
                password: hash,
                name: req.body.name,
                age: req.body.age
              };
              User
                .create(user)
                .then(id => {
                  res.json({
                    id,
                    message: '👍'
                  });
                });
            });
        } else {
          next(new Error('Email in use'));
        }
      });
  } else {
    next(new Error('Invalid user'));
  }
});


router.post('/login', (req, res, next) => {
  if(validUser(req.body)) {
    User
      .getOneByEmail(req.body.email)
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then(result => {
              if (result) {
                res.cookie('user_id', user.id, {
                  httpOnly: true,
                  signed: true,
                  secure: req.app.get('env') != 'development'
                });
                res.json({
                  message: 'Logged in!'
                });
              } else {
                next(new Error('Invalid Password'));
              }
            });
        } else {
          next(new Error('Invalid login'));
        }
      });
  } else {
    next(new Error('Invalid login'));
  }
});

module.exports = router;
