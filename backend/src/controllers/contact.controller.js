const mailService = require("../services/mail.service");

const postContact = async (req, res, next) => {
    try {
        const { nom, email, message } = req.body;

        await mailService.sendContactEmail({ nom, email, message });

        return res.status(200).json({ message: "Message envoyé." });
    } catch (err) {
        return next(err);
    }
};

module.exports = { postContact };
