const { validateResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validate = (req, res, next) => {
    const errors = validateResult(req);
    if (!errors.isEmpty()) {
        // On envoie une erreur explicite et testable (Postman)
        return next(
            new ApiError(400, 'Validation Error', {
                errors: errors.array().map((e) => ({
                    field: e.path,
                    message: e.msg,
                })),
            })
        );
    }
    next();
};

module.exports = { validate };