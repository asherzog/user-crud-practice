var express = require('express');
var router = express.Router();
var user = require('../db/query');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  if (!isNaN(req.params.id)){
    user.getOne(req.params.id)
        .then(user => {
          if (user) {
            delete user.password;
            res.json(user);
          }
          else {
            resError(res, 404, 'User not found');
          }
        });
  }
  else {
    resError(res, 500, 'invalid input');
  }
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
