const express = require("express");
const { body } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");
const { contactLimiter } = require("../middlewares/rateLimit.middleware");
const { postContact } = require("../controllers/contact.controller");

const router = express.Router();

/**
 * POST /contact
 * Remarque : selon le montage (app.use("/api", ...)),
 * l'URL finale attendue sera typiquement : POST /api/contact
 */
router.post(
    "/",
    contactLimiter,
    [
        body("nom")
            .trim()
            .notEmpty().withMessage("Le champ 'nom' est requis.")
            .isLength({ min: 2, max: 80 }).withMessage("Le champ 'nom' doit contenir entre 2 et 80 caractères."),

        body("email")
            .trim()
            .notEmpty().withMessage("Le champ 'email' est requis.")
            .isEmail().withMessage("Le format de l'email est invalide.")
            .isLength({ max: 254 }).withMessage("Le champ 'email' est trop long."),

        body("message")
            .trim()
            .notEmpty().withMessage("Le champ 'message' est requis.")
            .isLength({ min: 10, max: 2000 }).withMessage("Le champ 'message' doit contenir entre 10 et 2000 caractères."),

        // Honeypot: doit être vide
        body("website")
            .optional({ nullable: true })
            .custom((value) => {
                if (typeof value === "string" && value.trim() !== "") {
                    throw new Error("Requête rejetée (spam détecté).");
                }
                return true;
            }),
    ],
    validate,
    postContact
);

module.exports = router;
