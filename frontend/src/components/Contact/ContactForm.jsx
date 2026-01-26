// src/components/contact/ContactForm.jsx
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm({ artisanId, artisanName }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Honeypot (anti-spam)
    const [company, setCompany] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    function validate() {
        if (!name.trim()) return "Le nom est requis.";
        if (!email.trim()) return "L’email est requis.";
        if (!isValidEmail(email.trim())) return "Le format de l’email est invalide.";
        if (!message.trim()) return "Le message est requis.";
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess(false);
        setError(null);

        // Si honeypot rempli -> on simule une réussite silencieuse
        if (company.trim()) {
            setSuccess(true);
            return;
        }

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setSubmitting(true);

        try {
            // Ton backend indique POST /api/contact (d’après ton contexte)
            const res = await fetch(`${API_BASE_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                    artisanId, // utile si ton API l’accepte; sinon retire ce champ.
                    artisanName, // idem
                    company, // honeypot
                }),
            });

            if (!res.ok) {
                throw new Error(`Erreur lors de l’envoi (${res.status})`);
            }

            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erreur inconnue");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="contactForm">
            <div className="d-flex flex-column align-items-start gap-2 mb-3">
                <div className="separationGreen mx-0"></div>
                <h3 className="title_h3">Le contacter</h3>
            </div>

            {success ? (
                <div className="alert alert-success" role="status">
                    Message envoyé.
                </div>
            ) : null}

            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : null}

            <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot caché */}
                <div className="visually-hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        autoComplete="off"
                        tabIndex={-1}
                    />
                </div>

                <div className="row g-3">
                    <div className="col-6 col-md-6">
                        <label className="form-label" htmlFor="contact-name">
                            Nom
                        </label>
                        <input
                            id="contact-name"
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom"
                            required
                        />
                    </div>

                    <div className="col-6 col-md-6">
                        <label className="form-label" htmlFor="contact-email">
                            Email
                        </label>
                        <input
                            id="contact-email"
                            className="form-control"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label" htmlFor="contact-message">
                            Message
                        </label>
                        <textarea
                            id="contact-message"
                            className="form-control"
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Votre message"
                            required
                        />
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
