const nodemailer = require("nodemailer");

function buildTransporter() {
    const host = process.env.SMTP_HOST;
    const portRaw = process.env.SMTP_PORT;
    const port = Number(portRaw);
    const secure = String(process.env.SMTP_SECURE).toLowerCase() === "true";

    if (!host || !portRaw || Number.isNaN(port)) {
        const err = new Error("SMTP non configuré (SMTP_HOST/SMTP_PORT manquants ou invalides).");
        err.statusCode = 500;
        throw err;
    }

    const user = process.env.SMTP_USER || "";
    const pass = process.env.SMTP_PASS || "";
    const auth = user && pass ? { user, pass } : undefined;

    return nodemailer.createTransport({ host, port, secure, auth });
}

async function sendMessageToArtisan({ artisan, sender, message }) {
    const from = process.env.MAIL_FROM;

    if (!from) {
        const err = new Error("MAIL_FROM non configuré.");
        err.statusCode = 500;
        throw err;
    }

    // ⚠️ adapte si ton modèle n'utilise pas ces noms
    const to = artisan.email;
    const artisanName = artisan.nom;

    if (!to) {
        const err = new Error("Email de l'artisan indisponible.");
        err.statusCode = 500;
        throw err;
    }

    const transporter = buildTransporter();

    const subject = `[Trouve ton artisan] Message pour ${artisanName}`;
    const text =
        `Message envoyé via Trouve ton artisan

Artisan : ${artisanName}
De : ${sender.nom} <${sender.email}>

Message :
${message}
`;

    try {
        await transporter.sendMail({
            from,
            to,
            replyTo: sender.email,
            subject,
            text,
        });
    } catch (e) {
        const err = new Error("Erreur lors de l'envoi SMTP.");
        err.statusCode = 502;
        err.details = e?.message;
        throw err;
    }
}

module.exports = {
    // si tu avais déjà sendContactEmail, garde-le
    sendMessageToArtisan,
};
