const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too Many Requests",
        message: "Trop de requêtes. Réessaie plus tard.",
    },
});

module.exports = { contactLimiter };
