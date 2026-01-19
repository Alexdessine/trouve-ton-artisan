const express = require('express');
const router = express.Router();
const artisansController = require('../controllers/artisans.controller');
const { body, param } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");
const { contactLimiter } = require("../middlewares/rateLimit.middleware");
const { postContactArtisan } = require("../controllers/artisans.controller");

// IMPORTANT : /featured avant /:id
router.get('/featured', artisansController.getFavori);
router.get('/', artisansController.getAll);
router.get('/:id', artisansController.getById);

router.post(
    "/:id/contact",
    contactLimiter,
    [
        param("id")
            .notEmpty().withMessage("L'id artisan est requis.")
            .isInt({ min: 1 }).withMessage("L'id artisan doit être un entier positif."),

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

        // Honeypot
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
    postContactArtisan
);

module.exports = router;
