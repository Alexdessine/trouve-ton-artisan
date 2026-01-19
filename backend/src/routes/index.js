var express = require('express');
var router = express.Router();

// const categories = require('../src/services/categories.service');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
  res.json({ message: 'Welcome to the API' });
});

router.get('/api/status', function(req, res, next) {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// router.get('/api/categories',
//   categories.getAllCategories, (req, res) => {
//     res.json(res.locals.data);
//   }
// );

module.exports = router;
