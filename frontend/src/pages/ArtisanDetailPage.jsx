import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import ContactForm from "../components/Contact/ContactForm";
import profil from "../assets/img/user.svg";
import RatingStars from "../components/Artisans/RatingStars";

// URL de l'API depuis les variables d'environnement
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Validation de l'ID (doit être un entier positif)
function isValidId(id) {
    return /^[0-9]+$/.test(id);
}

// Composant page de détail d'un artisan
export default function ArtisanDetailPage() {
    const { id } = useParams();
    const artisanId = Number(id);
    const [artisan, setArtisan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    // Effet pour charger les données de l'artisan
    useEffect(() => {
        let isMounted = true;

        // Fonction asynchrone pour récupérer les données de l'artisan
        async function fetchArtisan() {
            setLoading(true);
            setError(null);
            setNotFound(false);

            // Validation de l'ID
            if (!id || !isValidId(id)) {
                setLoading(false);
                setNotFound(true);
                return;
            }

            // Requête à l'API pour récupérer les données de l'artisan
            try {
                // Appel API
                const res = await fetch(`${API_BASE_URL}/api/artisans/${id}`);

                // Vérification de la réponse
                const contentType = res.headers.get("content-type") || "";

                // Gestion des erreurs HTTP
                if (!res.ok) {
                    // on évite res.json() si c’est du HTML
                    const raw = await res.text();
                    if (res.status === 404) {
                        setNotFound(true);
                        setArtisan(null);
                        setLoading(false);
                        return;
                    }
                    throw new Error(`Erreur API (${res.status}) - ${raw.slice(0, 120)}`);
                }

                // Vérification du type de contenu
                if (!contentType.includes("application/json")) {
                    const raw = await res.text();
                    throw new Error(`Réponse non JSON reçue: ${raw.slice(0, 120)}`);
                }

                const data = await res.json();
                setArtisan(data);
                setLoading(false);
            } catch (e) {
                // Gestion des erreurs
                if (!isMounted) return;
                setError(e instanceof Error ? e.message : "Erreur inconnue");
                setLoading(false);
            }
        }

        // Appel de la fonction de récupération des données
        fetchArtisan();

        return () => {
            isMounted = false;
        };
    }, [id]);

    // Affichage des différents états (chargement, erreur, non trouvé)
    if (loading) {
        return (
            <div className="container py-4">
                <h1 className="page-title">Mon artisan</h1>
                <div className="separationRed"></div>
                <div className="alert alert-info mb-0" role="status">
                    Chargement de la fiche artisan...
                </div>
            </div>
        );
    }

    // Affichage des différents états (chargement, erreur, non trouvé)
    if (notFound) {
        return (
            <div className="container py-4">
                <h1 className="page-title">Mon artisan</h1>
                <div className="separationRed"></div>
                <div className="alert alert-warning mb-0" role="status">
                    Fiche artisan non trouvée.
                </div>
            </div>
        );
    }

    // Erreur de chargement
    if (error) {
        return (
            <div className="container py-4">
                <h1 className="page-title">Mon artisan</h1>
                <div className="separationRed"></div>
                <div className="alert alert-danger mb-3" role="alert">
                    {error}
                </div>
                <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
                    Réessayer
                </button>
            </div>
        );
    }

    // Données de la fiche artisan
    const name = artisan?.nom || "Nom non disponible";
    const city = artisan?.ville || "";
    const speciality = artisan.Specialite?.label ?? "—";
    const about = artisan?.a_propos ?? "";
    const website = artisan?.site ?? artisan?.site_web ?? "";

    return (
        <section className="container py-4">
            <h1 className="page-title mx-0">Mon artisan</h1>
            <div className="row g-4">
                {/* colonne gauche */}
                <div className="col-12 col-md-12 col-lg-6 artisanInfoColumn">
                    <div className="p-4 p-lg-5 rounded-3 artisanInfo">
                        {/* Profil */}
                        <div className="text-center mb-4">
                            {/* Avatar par défaut */}
                            <img src={profil} alt="Profil" className="me-2 profilDetail" />
                            <h2 className="h4 mb-1">{name}</h2>
                            <div className="mb-2">
                                <RatingStars value={artisan.note} />
                            </div>
                            <div className="text-body-secondary">{speciality}</div>
                        </div>
                        {/* Location + site web */}
                        <div className="locationArtisan">
                            <div className="mb-2"><i className="fa-solid fa-location-dot"></i> {city}</div>
                            {website? <a href={website} target="_blank" rel="noopener noreferrer"className=""><i className="fa-solid fa-globe-pointer"></i> {website}</a> : null}
                        </div>
                        <div className="a_propos d-none d-md-none d-lg-block">
                            <div className="separationBlue mt-4 mt-md-0 mx-0"></div>
                            <h3 className="title_h3">À propos de cet artisan</h3>
                            <p className="px-3 mb-0">{about}</p>
                        </div>
                    </div>
                    <div className="a_propos_mobile d-lg-none">
                        <div className="separationBlue mt-4 mt-md-0 mx-0"></div>
                        <h3 className="title_h3">À propos de cet artisan</h3>
                        <p className="px-3 mb-0">{about}</p>
                    </div>
                </div>
                {/* Colonne droite */}
                <div className="col-12 col-md-12 col-lg-6">
                    <ContactForm artisanId={artisanId} artisanName={name} />
                </div>
            </div>
        </section>
    );
}