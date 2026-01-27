// Import de Nodemailer.
// Cette librairie permet l’envoi d’emails via un serveur SMTP
// sans exposer de logique d’envoi dans les contrôleurs.
const nodemailer = require("nodemailer");

/*
|--------------------------------------------------------------------------
| Construction du transporteur SMTP
|--------------------------------------------------------------------------
| Cette fonction centralise la configuration SMTP.
| Elle est appelée à chaque envoi d’email afin de garantir :
| - une configuration valide,
| - une séparation claire entre configuration et usage.
*/
function buildTransporter() {
  // Paramètres SMTP fournis via variables d’environnement
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const port = Number(portRaw);
  const secure = String(process.env.SMTP_SECURE).toLowerCase() === "true";

  /*
      Vérification minimale de la configuration SMTP.
      En cas de configuration invalide, une erreur serveur est levée
      afin d’éviter un comportement silencieux ou incohérent.
  */
  if (!host || !portRaw || Number.isNaN(port)) {
    const err = new Error(
      "SMTP non configuré (SMTP_HOST/SMTP_PORT manquants ou invalides)."
    );
    err.statusCode = 500;
    throw err;
  }

  /*
      Authentification SMTP optionnelle.
      Certains serveurs SMTP (ex : local / relais internes)
      ne nécessitent pas d’identifiants.
  */
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const auth = user && pass ? { user, pass } : undefined;

  // Création du transporteur Nodemailer
  return nodemailer.createTransport({ host, port, secure, auth });
}

/*
|--------------------------------------------------------------------------
| Envoi d’un message direct à un artisan
|--------------------------------------------------------------------------
| Utilisé lorsque l’utilisateur contacte un artisan spécifique.
| L’email est envoyé à l’adresse de l’artisan.
*/
async function sendMessageToArtisan({ artisan, sender, message }) {
  const from = process.env.MAIL_FROM;

  // Vérification de l’adresse expéditeur plateforme
  if (!from) {
    const err = new Error("MAIL_FROM non configuré.");
    err.statusCode = 500;
    throw err;
  }

  // Informations destinataire (artisan)
  const to = artisan.email;
  const artisanName = artisan.nom;

  if (!to) {
    const err = new Error("Email de l'artisan indisponible.");
    err.statusCode = 500;
    throw err;
  }

  const transporter = buildTransporter();

  // Sujet et corps du message (format texte volontairement simple)
  const subject = `[Trouve ton artisan] Message pour ${artisanName}`;
  const text = `Message envoyé via Trouve ton artisan

Artisan : ${artisanName}
De : ${sender.nom} <${sender.email}>

Message :
${message}
`;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: sender.email, // Permet à l’artisan de répondre directement
      subject,
      text,
    });
  } catch (e) {
    /*
        En cas d’erreur SMTP :
        - on encapsule l’erreur technique,
        - on renvoie un message générique au client,
        - on conserve le détail pour les logs serveur.
    */
    const err = new Error("Erreur lors de l'envoi SMTP.");
    err.statusCode = 502;
    err.details = e?.message;
    throw err;
  }
}

/*
|--------------------------------------------------------------------------
| Envoi du formulaire de contact plateforme
|--------------------------------------------------------------------------
| Utilisé pour :
| - le formulaire de contact général,
| - ou le contact à propos d’un artisan (sans exposer son email).
|
| Aucun message n’est stocké en base (conformité RGPD).
*/
async function sendContactEmail({ sender, message, artisan }) {
  const from = process.env.MAIL_FROM;

  // Adresse de réception centrale (plateforme)
  const to =
    process.env.CONTACT_RECEIVER_EMAIL || process.env.MAIL_TO;

  if (!from) {
    const err = new Error("MAIL_FROM non configuré.");
    err.statusCode = 500;
    throw err;
  }

  if (!to) {
    const err = new Error(
      "CONTACT_RECEIVER_EMAIL (ou MAIL_TO) non configuré."
    );
    err.statusCode = 500;
    throw err;
  }

  const transporter = buildTransporter();

  // Sujet dynamique selon le contexte
  const subject = artisan
    ? `[Trouve ton artisan] Message pour artisan ${artisan.nom}`
    : `[Trouve ton artisan] Nouveau message de contact`;

  const text = `Message envoyé via Trouve ton artisan

De : ${sender.nom} <${sender.email}>

${artisan ? `Artisan : ${artisan.nom}\n` : ""}

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
    /*
        Log détaillé côté serveur uniquement.
        Aucune information sensible n’est renvoyée au client.
    */
    console.error("[SMTP ERROR]", {
      message: e?.message,
      code: e?.code,
      response: e?.response,
      responseCode: e?.responseCode,
      command: e?.command,
    });

    const err = new Error("Erreur lors de l'envoi SMTP.");
    err.statusCode = 502;
    err.details = e?.message;
    throw err;
  }
}

// Export des fonctions du service mail
module.exports = {
  sendMessageToArtisan,
  sendContactEmail,
};
