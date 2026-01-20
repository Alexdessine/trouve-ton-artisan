// Origines autorisées = front(s) de l'application uniquement.
// IMPORTANT : CORS protège le navigateur, par les appels curls/server-to-server.

export const allowedOrigins = [
    process.env.FRONTEND_URL, // ex: https://trouve-ton-artisan.fr
    process.env.FRONTEND_URL_WWW, // ex: https://www.trouve-ton-artisan.fr
].filter(Boolean);

/**
 * Délègue la config CORS en fonction de l'Origin
 * Stratégie stricte : si Origin absent -> refus (évite accès hors application via navigateur)
 * Note : cela n'empêche pas techniquement curl, mais empêche la lecture des réponses via JS hors origines autorisées.
 */
export function corsOptionsDelegate(req, callback) {
    const origin = req.header('Origin');

    // Requêtes sans Origin (curl, scripts, healthChecks, etc.)
    // Stricte "hors application" -> on refuse.
    if (!origin) return callback(null, { origin: false });

    const isAllowed = allowedOrigins.includes(origin);

    return callback(null, {
        origin: isAllowed,
        credentials: false,
        methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Accept"],
        optionsSuccessStatus: 204,
        maxAge: 600, 
    });
}
