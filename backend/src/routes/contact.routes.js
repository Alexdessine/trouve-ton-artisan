const express = require('express');
const router = express.Router();
const { contactLImiter } = require('../middlewares/rateLimiters');
const { validate } = require('../middlewares/contact.validation');
const { contactValidationRules } = require('../validators/contact.validator');
const { postContact } = require('../controllers/contact.controller');

router.post(
    "/contact", 
    contactLImiter, 
    contactValidationRules(),
    validate,
    postContact
);

module.exports = router;
