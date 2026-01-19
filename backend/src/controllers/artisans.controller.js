const artisansService = require('../services/artisans.service');
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

const postContactArtisan = async (req, res, next) => {
    try {
        const artisanId = Number(req.params.id);

        const artisan = await artisansService.getArtisanById(artisanId);

        if (!artisan) {
            return res.status(404).json({
                error: "Not Found",
                message: "Artisan introuvable.",
            });
        }

        const { nom, email, message } = req.body;

        await mailService.sendMessageToArtisan({
            artisan,
            sender: { nom, email },
            message,
        });

        return res.status(200).json({
            message: "Message envoyé à l'artisan.",
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = { getAll, getById, getFavori, postContactArtisan };
