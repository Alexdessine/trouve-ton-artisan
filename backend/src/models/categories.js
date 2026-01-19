const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Categories = sequelize.define('Categories', 
    {
        id_categorie: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING(255),
            allownull: false
        }
    },
    {
        tableName: 'categories',
        timestamps: false
    }
);

module.exports = Categories;