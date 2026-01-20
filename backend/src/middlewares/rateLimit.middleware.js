const rateLimit = require("express-rate-limit");

/**
 * Limiteur GLOBAL API
 * Objectif :
 *  - protéger l'API contre l'abus
 *  - limiter le scraping / flood
 *  - exigence du brief (sécurisation globale)
 */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,                 // 300 requêtes / IP / fenêtre
    standardHeaders: true, 
    legacyHeaders: false,
    message: {
        error: "RATE_LIMIT",
        message: "Trop de requêtes. Réessaie plus tard.",
    },
})

/**
 * Limiteur spécifique CONTACT
 * Objectif : 
 *  - protéger le formulaire (spam, bots)
 *  - plus strict volontairement
 */
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "RATE_LIMIT",
        message: "Trop de requêtes. Réessaie plus tard.",
    },
});

module.exports = { globalLimiter, contactLimiter };