const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Artisan',
        {
            id_artisan: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            note: {
                type: DataTypes.DECIMAL(2, 1),
                allowNull: true
            },
            ville: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            a_propos: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true
            },
            site: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            is_favori: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            id_specialite: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: 'artisans',
            timestamps: false
        }
    );
};
