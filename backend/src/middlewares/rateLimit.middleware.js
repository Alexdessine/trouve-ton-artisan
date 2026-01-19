const rateLimit = require('express-rate-limit');

// Exemple : 5 requêtes / 15 minutes / IP sur /api/contact
const contactlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        error: "Too many Requests",
        messsage: "Trop de requêtes. Réssaie plus tard.",
    },
});

module.exports = { contactlimiter };