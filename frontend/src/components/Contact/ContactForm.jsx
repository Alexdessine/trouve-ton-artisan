// src/components/contact/ContactForm.jsx

// React et hooks
import { useMemo, useState } from "react";

// URL de l'API depuis les variables d'environnement
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

// Validation des champs du formulaire
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Fonction de validation des valeurs du formulaire
function validate(values) {
    const errors = {};
    const nom = values.nom.trim();
    const email = values.email.trim();
    const message = values.message.trim();
    const website = values.website.trim();

    // Validation des champs
    if (!nom) errors.nom = "Le nom est requis.";
    else if (nom.length < 2) errors.nom = "Le nom doit contenir au moins 2 caractères.";
    else if (nom.length > 80) errors.nom = "Le nom ne doit pas dépasser 80 caractères.";

    if (!email) errors.email = "L’email est requis.";
    else if (email.length > 254) errors.email = "L’email ne doit pas dépasser 254 caractères.";
    else if (!isValidEmail(email)) errors.email = "Le format de l’email est invalide.";

    if (!message) errors.message = "Le message est requis.";
    else if (message.length < 10) errors.message = "Le message doit contenir au moins 10 caractères.";
    else if (message.length > 2000) errors.message = "Le message ne doit pas dépasser 2000 caractères.";

    // honeypot
    if (website) errors.website = "Requête invalide.";

    return errors;
}

// Composant fonctionnel ContactForm qui prend en prop l'ID de l'artisan
export default function ContactForm({ artisanId }) {
    const [values, setValues] = useState({
        nom: "",
        email: "",
        message: "",
        website: "", // honeypot
    });

    // états pour le formulaire
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // message global (pas sensible)
    const [submitError, setSubmitError] = useState("");

    // Validation des erreurs
    const errors = useMemo(() => validate(values), [values]);
    const showError = (field) => touched[field] && errors[field];

    // gestion des changements de champs
    function onChange(e) {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
    }

    // gestion du blur (champ touché)
    function onBlur(e) {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
    }

    // gestion de la soumission du formulaire
    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess(false);
        setSubmitError("");

        // marque tous les champs comme touchés pour afficher les erreurs
        setTouched({ nom: true, email: true, message: true, website: true });

        // validation avant envoi
        const currentErrors = validate(values);
        if (Object.keys(currentErrors).length > 0) {
            setSubmitError("Veuillez corriger les erreurs du formulaire.");
            return;
        }

        // Honeypot rempli : on ne fait rien côté réseau, réponse neutre
        if (values.website.trim()) {
            setSuccess(true);
            return;
        }

        setSubmitting(true);

        // Envoi des données au backend
        try {
            const res = await fetch(`${API_BASE_URL}/api/artisans/${artisanId}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom: values.nom.trim(),
                    email: values.email.trim(),
                    message: values.message.trim(),
                    website: values.website.trim(), // doit être vide
                }),
            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                // backend pas JSON -> ignore
            }

            if (!res.ok) {
                if (res.status === 429) {
                    setSubmitError("Trop de requêtes. Réessayez dans quelques instants.");
                    return;
                }

                // 400 validation backend (si message disponible)
                const msg = data?.message || `Erreur lors de l’envoi (${res.status}).`;
                setSubmitError(msg);
                return;
            }

            // succès
            setSuccess(true);
            setValues({ nom: "", email: "", message: "", website: "" });
            setTouched({});
        } catch {
            // erreur réseau ou autre
            setSubmitError("Erreur réseau ou serveur. Veuillez réessayer.");
        } finally {
            // fin de l'envoi
            setSubmitting(false);
        }
    }

    // Rendu du formulaire de contact
    return (
        <section className="contactForm">
            <div className="d-flex flex-column align-items-start gap-2 mb-3">
                <div className="separationGreen mx-0"></div>
                <h3 className="title_h3">Le contacter</h3>
            </div>

            {success && (
                <div className="alert alert-success" role="status">
                    Message envoyé.
                </div>
            )}

            {submitError && (
                <div className="alert alert-danger" role="alert">
                    {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot caché */}
                <div className="visually-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                        id="website"
                        name="website"
                        type="text"
                        value={values.website}
                        onChange={onChange}
                        onBlur={onBlur}
                        autoComplete="off"
                        tabIndex={-1}
                    />
                </div>

                <div className="row g-3">
                    <div className="col-6 col-md-6">
                        <label className="form-label" htmlFor="contact-nom">
                            Nom
                        </label>
                        <input
                            id="contact-nom"
                            name="nom"
                            className={`form-control ${showError("nom") ? "is-invalid" : ""}`}
                            type="text"
                            value={values.nom}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="Nom"
                            disabled={submitting}
                            maxLength={80}
                            required
                        />
                        {showError("nom") && <div className="invalid-feedback">{errors.nom}</div>}
                    </div>

                    <div className="col-6 col-md-6">
                        <label className="form-label" htmlFor="contact-email">
                            Email
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            className={`form-control ${showError("email") ? "is-invalid" : ""}`}
                            type="email"
                            value={values.email}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="Email"
                            disabled={submitting}
                            maxLength={254}
                            required
                        />
                        {showError("email") && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-12">
                        <label className="form-label" htmlFor="contact-message">
                            Message
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            className={`form-control ${showError("message") ? "is-invalid" : ""}`}
                            rows={6}
                            value={values.message}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="Votre message"
                            disabled={submitting}
                            maxLength={2000}
                            required
                        />
                        {showError("message") && <div className="invalid-feedback">{errors.message}</div>}
                        <div className="form-text">{values.message.trim().length}/2000</div>
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-primary px-5" type="submit" disabled={submitting}>
                            {submitting ? "Envoi..." : "Envoyer"}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
