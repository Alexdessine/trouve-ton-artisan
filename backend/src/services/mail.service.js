const nodemailer = require('nodemailer');
const ApiError = require('../utils/ApiError');

function buildTransporter() {
    const host = process.env.MAIL_HOST;
    const port = Number(process.env.MAIL_PORT);
    const secure = String(process.env.MAIL_SECURE).toLowerCase() === 'true';

    if (!host || !port) {
        throw new ApiError(500, "SMTP non configuré (variable d'environnement manquantes.)");
    }

    const user = process.env.MAIL_USER || "";
    const pass = process.env.MAIL_PASS || "";

    const auth = user && pass ? { user, pass} : undefined;

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth,
    });
}

async function sendContactEmail({ nom, email, message }) {
    const from = process.env.MAIL_FROM;
    const to = process.env.MAIL_TO;

    if (!from || !to) {
        throw new ApiError(500, "MAIL_FROM / MAIL_TO non configurés.");
    }

    const transporter = buildTransporter();

    const subject = `[Contact] Messsage de ${nom}`;
    const text = `Nouveau message via le formulaire de contact
    Nom : ${nom}
    Email : ${email}
    
    Message :
    ${message}`;

    try {
        // En dev, Papercut intercepte : pas un "vrai" envoi externe.
        await transporter.sendMail({
            from,
            to, 
            replyTo: email,
            subject,
            text,
        });
    } catch (e) {
        throw new ApiError(502, "Erreur lors de l'envoi SMTP.", {
            details: e?.message || "Unknown SMTP error",
        });
    }
}

module.exports = {
    sendContactEmail,
};