const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Specialite',
        {
            id_specialite: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            label: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            id_categorie: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'specialites',
            timestamps: false
        }
    );
};
