const sequelize = require('../config/database');

const Category = require('./Category')(sequelize);
const Specialite = require('./Specialite')(sequelize);
const Artisan = require('./Artisan')(sequelize);

// Relations d’après le schéma SQL
Specialite.belongsTo(Category, { foreignKey: 'id_categorie' });
Category.hasMany(Specialite, { foreignKey: 'id_categorie' });

Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite' });
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite' });

module.exports = {
    sequelize,
    Category,
    Specialite,
    Artisan
};
