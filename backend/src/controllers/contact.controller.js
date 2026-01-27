// Import du service d’envoi d’emails.
// Toute la logique SMTP est centralisée dans ce service
// afin d’éviter la duplication et de garder un contrôleur léger.
const mailService = require("../services/mail.service");

/*
|--------------------------------------------------------------------------
| POST /api/contact
|--------------------------------------------------------------------------
| Réception et traitement du formulaire de contact général.
|
| Ce endpoint permet à un utilisateur de contacter la plateforme
| sans lien direct avec un artisan spécifique.
|
| Aucune donnée n’est stockée en base :
| les informations sont utilisées uniquement pour l’envoi de l’email
| (conformité RGPD).
*/
const postContact = async (req, res, next) => {
    try {
        // Données envoyées par le formulaire de contact
        const { nom, email, message } = req.body;

        /*
            Envoi de l’email via le service dédié.
            Le contrôleur se limite à l’orchestration :
            - il récupère les données,
            - appelle le service,
            - retourne une réponse HTTP appropriée.
        */
        await mailService.sendContactEmail({
            sender: { nom, email },
            message,
        });

        // Confirmation d’envoi côté client
        return res.status(200).json({ message: "Message envoyé." });
    } catch (err) {
        // Délégation à la gestion centralisée des erreurs
        return next(err);
    }
};

// Export du handler
module.exports = { postContact };
