const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({
            error: "Validation error",
            message: "Certains champs sont invalides.",
            errors: result.array().map((e) => ({
                field: e.path,
                message: e.msg,
            })),
        });
    }

    next();
};

module.exports = { validate };
