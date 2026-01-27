// Import du service métier lié aux artisans.
// Le contrôleur délègue toute la logique de récupération des données
// au service afin de respecter une architecture en couches.
const artisansService = require("../services/artisans.service");

// Import du modèle Sequelize Artisan.
// Utilisé ici uniquement pour vérifier l’existence d’un artisan
// lors de l’envoi d’un message de contact.
const { Artisan } = require("../models");

// Service d’envoi d’emails.
// Centralise la logique SMTP et évite toute dépendance directe
// à un transporteur dans le contrôleur.
const mailService = require("../services/mail.service");

/*
|--------------------------------------------------------------------------
| GET /api/artisans
|--------------------------------------------------------------------------
| Récupération de la liste des artisans.
| Une recherche peut être effectuée via un paramètre de requête (?search=).
*/
async function getAll(req, res, next) {
    try {
        // Récupération éventuelle du paramètre de recherche
        const { search } = req.query;

        // Appel au service métier
        const artisans = await artisansService.getAll(search);

        /*
            Cas particulier :
            - Une recherche est demandée
            - Aucun résultat n’est trouvé
            → Retour d’un 404 avec un message explicite
        */
        if (search && artisans.length === 0) {
            return res.status(404).json({
                error: {
                    message: "Aucun artisan ne correspond à votre recherche",
                },
            });
        }

        // Retour de la liste des artisans (avec ou sans filtre)
        return res.status(200).json(artisans);
    } catch (err) {
        // Délégation à la gestion centralisée des erreurs
        return next(err);
    }
}

/*
|--------------------------------------------------------------------------
| GET /api/artisans/:id
|--------------------------------------------------------------------------
| Récupération de la fiche détaillée d’un artisan par son identifiant.
*/
async function getById(req, res, next) {
    try {
        const { id } = req.params;

        // Récupération de l’artisan via le service
        const artisan = await artisansService.getById(id);

        // Artisan introuvable
        if (!artisan) {
            return res.status(404).json({
                error: { message: "Artisan not found" },
            });
        }

        // Retour de la fiche artisan
        return res.status(200).json(artisan);
    } catch (err) {
        return next(err);
    }
}

/*
|--------------------------------------------------------------------------
| GET /api/artisans/featured (ou équivalent)
|--------------------------------------------------------------------------
| Récupération des artisans mis en avant (favoris).
| La logique de sélection est entièrement gérée côté service.
*/
async function getFavori(req, res, next) {
    try {
        const artisans = await artisansService.getFavori();
        return res.status(200).json(artisans);
    } catch (err) {
        return next(err);
    }
}

/*
|--------------------------------------------------------------------------
| POST /api/artisans/:id/contact
|--------------------------------------------------------------------------
| Envoi d’un message de contact à propos d’un artisan.
| Aucun message n’est stocké en base (conformité RGPD).
*/
async function postContactArtisan(req, res, next) {
    try {
        // Récupération et normalisation de l’identifiant artisan
        const artisanId = Number(req.params.id);

        // Données envoyées par le formulaire
        const { nom, email, message, website } = req.body;

        /*
            Honeypot anti-spam :
            - Le champ "website" doit rester vide
            - S’il est rempli, la requête est considérée comme suspecte
            - Protection complémentaire au validateur
        */
        if (typeof website === "string" && website.trim() !== "") {
            return res.status(400).json({
                message: "Requête rejetée (spam détecté).",
            });
        }

        // Vérification de l’existence de l’artisan
        const artisan = await Artisan.findByPk(artisanId);
        if (!artisan) {
            return res.status(404).json({
                message: "Artisan introuvable.",
            });
        }

        /*
            Adresse de réception des messages.
            Elle est définie via variable d’environnement
            afin d’éviter toute exposition côté client.
        */
        const to = process.env.CONTACT_RECEIVER_EMAIL;

        /*
            Envoi de l’email via le service dédié.
            Le contrôleur ne gère que l’orchestration,
            pas la logique SMTP.
        */
        await mailService.sendContactEmail({
            sender: { nom, email },
            message,
            artisan: {
                id: artisan.id,
                nom: artisan.nom,
            },
        });

        // Confirmation d’envoi au client
        return res.status(200).json({ message: "Message envoyé." });
    } catch (err) {
        return next(err);
    }
}

// Export des handlers du contrôleur
module.exports = {
    getAll,
    getById,
    getFavori,
    postContactArtisan,
};
