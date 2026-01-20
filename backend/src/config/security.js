// src/config/security.js
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_WWW,
].filter(Boolean);

function corsOptionsDelegate(req, callback) {
    const origin = req.header("Origin");

    // Stratégie stricte : pas d'Origin => pas de CORS
    // (CORS protège le navigateur, pas curl)
    if (!origin) return callback(null, { origin: false });

    const isAllowed = allowedOrigins.includes(origin);

    return callback(null, {
        origin: isAllowed,
        credentials: false,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Accept"],
        optionsSuccessStatus: 204,
        maxAge: 600,
    });
}

module.exports = { allowedOrigins, corsOptionsDelegate };
