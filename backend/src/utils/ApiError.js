class ApiError extends Error {
    constructor(statusCode, message, payload = null) {
        super(message);
        this.statusCode = statusCode;
        this.payload = payload;
    }
}

module.exports = ApiError;