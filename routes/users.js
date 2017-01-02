var express = require('express');
var router = express.Router();
var user = require('../db/query');


const authMiddleware = require('../auth/middleware.js');

/* GET users listing. */
router.get('/:id', authMiddleware.allowAccess, function(req, res, next) {
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


router.get('/:id/sticker', authMiddleware.allowAccess, (req,res)=>{
  if (!isNaN(req.params.id)) {
    user.getByUser(req.params.id).then(stickers => {
      res.json(stickers);
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});


function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
