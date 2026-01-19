const express = require('express');
var router = express.Router();
const contactRoutes = require('./contact.routes');

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

router.use('/api', contactRoutes);

module.exports = router;
