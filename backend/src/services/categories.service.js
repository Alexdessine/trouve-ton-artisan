const { Category } = require('../models');

async function getAll() {
    return Category.findAll({
        order: [['id_categorie', 'ASC']]
    });
}

module.exports = { getAll };
