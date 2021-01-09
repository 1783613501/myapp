var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'helloworld',
  num:123456,
  arr:['北京','上海','广州','深圳'],
  onoff:true,
  html:"<mark>这是一个mark标签</mark>"
})

});

module.exports = router;
