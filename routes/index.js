var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/user', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

router.post('/user', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err, user){
    if(err){ return next(err); }

    res.json(user);
  });
});

router.get('/categories', function(req, res, next) {
  Category.find(function(err, categories){
    if(err){ return next(err); }

    res.json(categories);
  });
});

module.exports = router;

