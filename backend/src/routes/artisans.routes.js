const express = require('express');
const router = express.Router();
const artisansController = require('../controllers/artisans.controller');

// IMPORTANT : /featured avant /:id
router.get('/featured', artisansController.getFavori);
router.get('/', artisansController.getAll);
router.get('/:id', artisansController.getById);

module.exports = router;
