// Import de l’opérateur Sequelize.
// Op.like est utilisé pour effectuer une recherche partielle (SQL LIKE)
// sur le nom des artisans.
const { Op } = require("sequelize");

// Import des modèles Sequelize nécessaires.
// Le service interagit directement avec les modèles
// et expose des méthodes utilisées par les contrôleurs.
const { Artisan, Specialite, Category } = require("../models");

/*
|--------------------------------------------------------------------------
| Récupération de tous les artisans (avec recherche optionnelle)
|--------------------------------------------------------------------------
| Cette fonction permet :
| - de récupérer l’ensemble des artisans,
| - ou de filtrer les résultats par nom via un champ de recherche.
|
| La logique métier est centralisée ici, et non dans le contrôleur.
*/
async function getAll(search) {
    // Construction dynamique de la clause WHERE.
    // Si une recherche est fournie, on filtre sur le nom de l’artisan.
    // Sinon, aucune condition n’est appliquée.
    const whereClause = search
        ? { nom: { [Op.like]: `%${search}%` } }
        : {};

    return Artisan.findAll({
        where: whereClause,

        /*
            Inclusion des relations :
            - Specialite liée à l’artisan
            - Category liée à la spécialité
            Cela permet de retourner des données complètes
            en une seule requête.
        */
        include: [
            {
                model: Specialite,
                include: [{ model: Category }],
            },
        ],

        // Tri alphabétique des artisans par nom
        order: [["nom", "ASC"]],
    });
}

/*
|--------------------------------------------------------------------------
| Récupération d’un artisan par son identifiant
|--------------------------------------------------------------------------
| Utilisée pour afficher la fiche détaillée d’un artisan.
*/
async function getById(id) {
    return Artisan.findByPk(id, {
        include: [
            {
                model: Specialite,
                include: [{ model: Category }],
            },
        ],
    });
}

/*
|--------------------------------------------------------------------------
| Récupération des artisans favoris
|--------------------------------------------------------------------------
| Cette fonction permet de mettre en avant certains artisans
| (ex : page d’accueil, section "à la une").
*/
async function getFavori() {
    return Artisan.findAll({
        // Filtrage sur le champ booléen is_favori
        where: { is_favori: true },

        include: [
            {
                model: Specialite,
                include: [{ model: Category }],
            },
        ],

        // Tri stable par identifiant
        order: [["id_artisan", "ASC"]],
    });
}

/*
|--------------------------------------------------------------------------
| Récupération simple d’un artisan par ID (usage interne)
|--------------------------------------------------------------------------
| Version allégée sans inclusion des relations.
| Peut être utilisée pour des vérifications d’existence
| ou des traitements internes (ex : contact).
*/
const getArtisanById = async (id) => {
    return Artisan.findByPk(id);
};

// Export des méthodes du service
module.exports = {
    getAll,
    getById,
    getFavori,
    getArtisanById,
};
