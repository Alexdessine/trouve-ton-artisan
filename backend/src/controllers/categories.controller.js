// Import du service métier lié aux catégories.
// Le contrôleur ne contient aucune logique métier :
// il délègue entièrement la récupération des données au service.
const categoriesService = require("../services/categories.service");

/*
|--------------------------------------------------------------------------
| GET /api/categories
|--------------------------------------------------------------------------
| Récupération de la liste complète des catégories d’artisans.
|
| Ce endpoint est public et permet :
| - l’affichage des catégories sur la page d’accueil,
| - le filtrage des artisans côté frontend.
*/
async function getAll(req, res, next) {
    try {
        // Appel au service pour récupérer toutes les catégories
        const categories = await categoriesService.getAll();

        // Retour des données au format JSON
        return res.status(200).json(categories);
    } catch (err) {
        // Délégation à la gestion centralisée des erreurs
        return next(err);
    }
}

// Export des handlers du contrôleur
module.exports = { getAll };
