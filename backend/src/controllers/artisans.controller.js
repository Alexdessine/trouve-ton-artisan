const artisansService = require('../services/artisans.service');

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

module.exports = { getAll, getById, getFavori };
