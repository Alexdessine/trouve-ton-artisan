// Import de la fonction validationResult depuis express-validator.
// Elle permet de récupérer le résultat des règles de validation
// définies en amont sur les routes.
const { validationResult } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Middleware de validation des entrées
|--------------------------------------------------------------------------
| Ce middleware vérifie les résultats produits par express-validator.
| Il est utilisé après les règles de validation définies sur une route
| et avant le contrôleur.
|
| Objectifs :
| - garantir l’intégrité des données reçues,
| - éviter les traitements inutiles côté contrôleur,
| - améliorer la sécurité globale de l’API.
*/
const validate = (req, res, next) => {
    // Récupération du résultat des validations
    const result = validationResult(req);

    // Si des erreurs de validation sont présentes
    if (!result.isEmpty()) {
        return res.status(400).json({
            // Message générique pour le client
            error: "Validation error",
            message: "Certains champs sont invalides.",

            /*
                Détail des erreurs :
                - field : nom du champ concerné
                - message : message de validation associé
                Cette structure facilite l’affichage des erreurs côté frontend.
            */
            errors: result.array().map((e) => ({
                field: e.path,
                message: e.msg,
            })),
        });
    }

    // Si aucune erreur n’est détectée, la requête est transmise
    // au middleware ou contrôleur suivant.
    next();
};

// Export du middleware
module.exports = { validate };
