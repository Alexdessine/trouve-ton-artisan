const Categories = require('../models/Categories');

async function getAllCategories() {
    return Categories.findAll();
}

module.exports = {
    getAllCategories
};