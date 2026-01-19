const { body } = require('express-validator');

const contactValidationRules = () => [
    body("nom")
        .trim()
        .notEmpty().withMessage("Le nom est obligatoire.")
        .isLength({min:2, max: 80 }).withMessage("Le nom doit contenir entre 2 et 80 caractères."),

    body("email")
        .trim()
        .notEmpty().withMessage("L'email est obligatoire.")
        .isEmail().withMessage("L'email doit être une adresse email valide.")
        .isLength({ max: 254 }).withMessage("L'email doit contenir au maximum 254 caractères."),

    body("message")
        .trim()
        .notEmpty().withMessage("Le message est obligatoire.")
        .isLength({ min: 10, max: 1000 }).withMessage("Le message doit contenir entre 10 et 1000 caractères."),

    // Honeypot (ex:website doit être vide)
    body("website")
        .optional({ nullable: true})
        .custom((value) => {
            if (typeof value === "string" && value.trim() !== "") {
                throw new Error("Requête rejetée (spam détectée");
            }
            return true;
        }),
];

module.exports = { contactValidationRules };