const express = require('express');
const router = express.Router();

router.use('/categories', require('./categories.routes'));
router.use('/artisans', require('./artisans.routes'));

router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;
