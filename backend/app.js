// Chargement des utilitaires Node.js
const path = require("path");

// Chargement des variables d’environnement depuis le fichier .env
// Le chemin est explicitement défini pour éviter toute ambiguïté.
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

// Dépendances Express et middlewares standards
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// Middlewares de sécurité personnalisés
const {
  globalLimiter,
} = require("./src/middlewares/rateLimit.middleware");
const {
  corsOptionsDelegate,
} = require("./src/config/security");

// Déclaration des routeurs
const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const apiRouter = require("./src/routes/api.routes");

// Initialisation de l’application Express
const app = express();

/*
|--------------------------------------------------------------------------
| Configuration du moteur de vues (partie web)
|--------------------------------------------------------------------------
| Le backend sert également quelques pages web (EJS),
| notamment pour la gestion des erreurs côté navigateur.
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
|--------------------------------------------------------------------------
| Configuration proxy & rate limiting (API)
|--------------------------------------------------------------------------
| - trust proxy : nécessaire lorsque l’application est derrière un proxy
|   (hébergement, reverse proxy, load balancer).
| - rate limiting : protection globale des routes API.
*/
app.set("trust proxy", 1);
app.use("/api", globalLimiter);

/*
|--------------------------------------------------------------------------
| Configuration CORS (API uniquement)
|--------------------------------------------------------------------------
| - CORS restrictif basé sur une liste blanche
| - Aucune ouverture globale (`origin: *`)
| - Préflight OPTIONS explicitement géré
*/
app.use("/api", cors(corsOptionsDelegate));
app.options("/api/*", cors(corsOptionsDelegate));

/*
|--------------------------------------------------------------------------
| Logs de configuration (hors production uniquement)
|--------------------------------------------------------------------------
| Permet de vérifier rapidement la configuration SMTP en développement
| sans exposer ces informations en production.
*/
if (process.env.NODE_ENV !== "production") {
  console.log("MAIL_FROM =", process.env.MAIL_FROM);
  console.log("MAIL_TO =", process.env.MAIL_TO);
  console.log("SMTP_HOST =", process.env.SMTP_HOST);
  console.log("SMTP_PORT =", process.env.SMTP_PORT);
  console.log("SMTP_SECURE =", process.env.SMTP_SECURE);
}

/*
|--------------------------------------------------------------------------
| Middlewares globaux Express
|--------------------------------------------------------------------------
*/
app.use(logger("dev")); // Logs HTTP
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: false })); // Parsing form-data
app.use(cookieParser()); // Gestion des cookies
app.use(express.static(path.join(__dirname, "public"))); // Fichiers statiques

/*
|--------------------------------------------------------------------------
| Routes web
|--------------------------------------------------------------------------
*/
app.use("/", indexRouter);
app.use("/users", usersRouter);

/*
|--------------------------------------------------------------------------
| Routes API
|--------------------------------------------------------------------------
| Toutes les routes API sont préfixées par /api
*/
app.use("/api", apiRouter);

/*
|--------------------------------------------------------------------------
| Gestion des routes non trouvées (404)
|--------------------------------------------------------------------------
| - /api → réponse JSON
| - web → erreur HTTP standard (gérée par le moteur EJS)
*/
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      error: "NOT_FOUND",
      message: "Route introuvable.",
    });
  }
  next(createError(404));
});

/*
|--------------------------------------------------------------------------
| Gestion centralisée des erreurs
|--------------------------------------------------------------------------
| - API : réponse JSON standardisée
| - Web : rendu d’une page d’erreur EJS
|
| En production :
| - aucune stacktrace exposée
| - messages contrôlés
*/
app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;

  // Gestion des erreurs pour l’API REST
  if (req.path.startsWith("/api")) {
    const body = {
      error: status === 500 ? "INTERNAL_ERROR" : "ERROR",
      message: err.message || "Erreur interne.",
      ...(err.details ? { details: err.details } : {}),
    };

    // Ajout d’informations de debug uniquement hors production
    if (process.env.NODE_ENV !== "production") {
      body.debug = {
        name: err.name,
        stack: err.stack,
      };
    }

    return res.status(status).json(body);
  }

  // Gestion des erreurs pour la partie web (EJS)
  res.status(status);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

// Export de l’application Express
module.exports = app;
