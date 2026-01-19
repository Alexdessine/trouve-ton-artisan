const categoriesService = require('../services/categories.service');

async function getAll(req, res, next) {
    try {
        const categories = await categoriesService.getAll();
        return res.status(200).json(categories);
    } catch (err) {
        return next(err);
    }
}

module.exports = { getAll };
