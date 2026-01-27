// src/config/security.js

/*
|--------------------------------------------------------------------------
| Configuration de la sécurité CORS
|--------------------------------------------------------------------------
| Ce fichier centralise la configuration CORS de l’API.
| L’objectif est de restreindre strictement les origines autorisées
| afin d’éviter les appels non légitimes depuis des navigateurs tiers.
|
| Rappel important :
| - CORS protège les navigateurs (clients web),
| - il ne protège pas contre les appels directs type curl / Postman.
*/

// Liste des origines autorisées.
// Elles sont définies via des variables d’environnement afin de pouvoir
// différencier facilement les contextes (local, preview, production).
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_WWW,
    process.env.FRONTEND_URL_PREVIEW,
].filter(Boolean); // Suppression des valeurs undefined / null

/*
|--------------------------------------------------------------------------
| Délégation dynamique des options CORS
|--------------------------------------------------------------------------
| Cette fonction est utilisée par le middleware CORS d’Express.
| Elle permet d’autoriser ou refuser une requête en fonction de son Origin.
|
| Cette approche est plus sécurisée qu’un `origin: *`
| et permet un contrôle fin des accès.
*/
function corsOptionsDelegate(req, callback) {
    // Récupération de l’en-tête Origin envoyé par le navigateur
    const origin = req.header("Origin");

    /*
        Stratégie volontairement stricte :
        - Si aucune Origin n’est présente, le CORS est refusé.
        - Cas typique : requêtes serveur à serveur ou outils type curl.
        - Cela limite l’exposition inutile de l’API côté navigateur.
    */
    if (!origin) {
        return callback(null, { origin: false });
    }

    // Vérification de l’origine par rapport à la liste blanche
    const isAllowed = allowedOrigins.includes(origin);

    // Retour de la configuration CORS appliquée à la requête
    return callback(null, {
        // Autorise l’origine uniquement si elle est explicitement listée
        origin: isAllowed,

        // Les cookies / credentials ne sont pas nécessaires dans ce projet
        // (API publique, sans authentification utilisateur)
        credentials: false,

        // Méthodes HTTP autorisées par l’API
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

        // En-têtes explicitement acceptés
        allowedHeaders: ["Content-Type", "Accept"],

        // Code de réponse standard pour les requêtes preflight OPTIONS
        optionsSuccessStatus: 204,

        // Durée de mise en cache de la réponse preflight (en secondes)
        // Permet de réduire le nombre de requêtes OPTIONS répétées
        maxAge: 600,
    });
}

// Export des éléments de configuration.
// Ils sont utilisés lors de l’initialisation du middleware CORS dans Express.
module.exports = {
    allowedOrigins,
    corsOptionsDelegate,
};
