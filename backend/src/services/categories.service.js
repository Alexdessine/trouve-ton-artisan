// Import du modèle Sequelize Category.
// Ce modèle représente les catégories d’artisans stockées en base de données.
const { Category } = require("../models");

/*
|--------------------------------------------------------------------------
| Récupération de toutes les catégories
|--------------------------------------------------------------------------
| Cette fonction est utilisée pour :
| - afficher les catégories côté frontend (page d’accueil, filtres),
| - garantir un ordre stable et prévisible des résultats.
|
| La logique d’accès aux données est centralisée dans le service,
| conformément à l’architecture en couches.
*/
async function getAll() {
    return Category.findAll({
        // Tri des catégories par identifiant croissant
        // afin de conserver un ordre cohérent avec la base de données.
        order: [["id_categorie", "ASC"]],
    });
}

// Export des méthodes du service
module.exports = { getAll };
