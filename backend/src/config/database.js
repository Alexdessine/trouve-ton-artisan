// Import de Sequelize.
// Sequelize est l’ORM utilisé pour gérer la connexion à la base de données
// et manipuler les données MySQL via des modèles JavaScript.
const { Sequelize } = require("sequelize");

/*
|--------------------------------------------------------------------------
| Configuration de la connexion à la base de données
|--------------------------------------------------------------------------
| Les informations de connexion sont fournies via des variables d’environnement.
| Cette approche permet :
| - d’éviter toute donnée sensible en dur dans le code,
| - de différencier facilement les environnements (local, preview, production),
| - de respecter les bonnes pratiques de sécurité.
|
| Variables attendues :
| - DB_HOST
| - DB_PORT
| - DB_NAME
| - DB_USER
| - DB_PASSWORD
*/

// Création de l’instance Sequelize.
// Elle représente la connexion active à la base MySQL
// et sera réutilisée par l’ensemble des modèles de l’application.
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",

        // Désactivation des logs SQL dans la console.
        // Cela évite d’exposer les requêtes en production
        // et améliore la lisibilité des logs serveur.
        logging: false,
    }
);

// Export de l’instance Sequelize.
// Elle est importée dans les modèles et au démarrage de l’application
// afin de tester la connexion et synchroniser les schémas si nécessaire.
module.exports = sequelize;
