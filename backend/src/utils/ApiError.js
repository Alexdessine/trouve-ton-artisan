/*
|--------------------------------------------------------------------------
| Classe d’erreur personnalisée API
|--------------------------------------------------------------------------
| Cette classe permet de standardiser la gestion des erreurs applicatives
| dans l’ensemble de l’API REST.
|
| Elle encapsule :
| - un code HTTP,
| - un message lisible côté client,
| - un payload optionnel pour fournir des informations complémentaires.
|
| L’objectif est de séparer clairement :
| - les erreurs métier,
| - les erreurs techniques,
| - et leur représentation HTTP.
*/
class ApiError extends Error {
    /**
     * @param {number} statusCode - Code HTTP à retourner au client
     * @param {string} message - Message d’erreur lisible
     * @param {any} payload - Données complémentaires optionnelles
     */
    constructor(statusCode, message, payload = null) {
        // Appel du constructeur natif Error
        super(message);

        // Code HTTP associé à l’erreur
        this.statusCode = statusCode;

        // Informations supplémentaires éventuelles
        // (ex : détails de validation, contexte métier)
        this.payload = payload;
    }
}

// Export de la classe ApiError
module.exports = ApiError;
