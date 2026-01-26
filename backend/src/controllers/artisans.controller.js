const artisansService = require('../services/artisans.service');
const { Artisan } = require("../models");
const mailService = require("../services/mail.service");

async function getAll(req, res, next) {
    try {
        const { search } = req.query;
        const artisans = await artisansService.getAll(search);

        // Recherche demandée mais pas de résultat
        if (search && artisans.length === 0) {
            return res.status(404).json({ error: 
                { message: 'Aucun artisan ne correspond à votre recherche' } 
            });
        }
        return res.status(200).json(artisans);
    } catch (err) {
        return next(err);
    }
}

async function getById(req, res, next) {
    try {
        const { id } = req.params;

        const artisan = await artisansService.getById(id);
        if (!artisan) {
            return res.status(404).json({ error: { message: 'Artisan not found' } });
        }

        return res.status(200).json(artisan);
    } catch (err) {
        return next(err);
    }
}

async function getFavori(req, res, next) {
    try {
        const artisans = await artisansService.getFavori();
        return res.status(200).json(artisans);
    } catch (err) {
        return next(err);
    }
}

async function postContactArtisan(req, res, next) {
    try {
        const artisanId = Number(req.params.id);
        const { nom, email, message, website } = req.body;

        // honeypot : ton validator s’en charge déjà, mais si tu veux double sécurité :
        if (typeof website === "string" && website.trim() !== "") {
            return res.status(400).json({ message: "Requête rejetée (spam détecté)." });
        }

        const artisan = await Artisan.findByPk(artisanId);
        if (!artisan) {
            return res.status(404).json({ message: "Artisan introuvable." });
        }

        const to = process.env.CONTACT_RECEIVER_EMAIL; // ex: contact@tonsite.fr (OBLIGATOIRE en prod)

        // Email plateforme (fiable)
        await mailService.sendContactEmail({
            sender: { nom, email },
            message,
            artisan: {id: artisan.id, nom: artisan.nom},
        });

        return res.status(200).json({ message: "Message envoyé." });
    } catch (err) {
        return next(err);
    }
};

module.exports = { getAll, getById, getFavori, postContactArtisan };
