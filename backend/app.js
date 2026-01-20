const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { globalLimiter } = require("./src/middlewares/rateLimit.middleware");
const { corsOptionsDelegate } = require("./src/config/security");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const apiRouter = require("./src/routes/api.routes");

const app = express();

// view engine setup (web)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Proxy / rate limit (API)
app.set("trust proxy", 1);
app.use("/api", globalLimiter);

// CORS restrictif (API uniquement)
app.use("/api", cors(corsOptionsDelegate));
app.options("/api/*", cors(corsOptionsDelegate));

// Logs de config: uniquement hors prod
if (process.env.NODE_ENV !== "production") {
  console.log("MAIL_FROM =", process.env.MAIL_FROM);
  console.log("MAIL_TO =", process.env.MAIL_TO);
  console.log("SMTP_HOST =", process.env.SMTP_HOST);
  console.log("SMTP_PORT =", process.env.SMTP_PORT);
  console.log("SMTP_SECURE =", process.env.SMTP_SECURE);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes web
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Routes API
app.use("/api", apiRouter);

/**
 * 404:
 * - /api -> JSON
 * - web -> http-errors (géré par error handler web)
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

/**
 * Error handler:
 * - /api -> JSON (pas de stack en prod)
 * - web -> page EJS error.ejs
 */
app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;

  // API JSON
  if (req.path.startsWith("/api")) {
    const body = {
      error: status === 500 ? "INTERNAL_ERROR" : "ERROR",
      message: err.message || "Erreur interne.",
      ...(err.details ? { details: err.details } : {}),
    };

    if (process.env.NODE_ENV !== "production") {
      body.debug = { name: err.name, stack: err.stack };
    }

    return res.status(status).json(body);
  }

  // Web EJS
  res.status(status);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

module.exports = app;
