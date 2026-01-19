const { Op } = require('sequelize');
const { Artisan, Specialite, Category } = require('../models');

async function getAll(search) {
    const whereClause = search
        ? { nom: { [Op.like]: `%${search}%` } }
        : {};
    return Artisan.findAll({
        where: whereClause,
        include: [
            {
                model: Specialite,
                include: [{ model: Category }]
            }
        ],
        order: [['nom', 'ASC']]
    });
}

async function getById(id) {
    return Artisan.findByPk(id, {
        include: [
            {
                model: Specialite,
                include: [{ model: Category }]
            }
        ]
    });
}

async function getFavori() {
    return Artisan.findAll({
        where: { is_favori: true },
        include: [
            {
                model: Specialite,
                include: [{ model: Category }]
            }
        ],
        order: [['id_artisan', 'ASC']]
    });
}

module.exports = { getAll, getById, getFavori };
