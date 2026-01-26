import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import ContactForm from "../components/Contact/ContactForm";
import profil from "../assets/img/user.svg";
import RatingStars from "../components/Artisans/RatingStars";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function isValidId(id) {
    return /^[0-9]+$/.test(id);
}

export default function ArtisanDetailPage() {
    const { id } = useParams();
    const [artisan, setArtisan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function fetchArtisan() {
            setLoading(true);
            setError(null);
            setNotFound(false);

            if (!id || !isValidId(id)) {
                setLoading(false);
                setNotFound(true);
                return;
            }

            try {
                const res = await fetch(`${API_BASE_URL}/api/artisans/${id}`);

                const contentType = res.headers.get("content-type") || "";

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

                if (!contentType.includes("application/json")) {
                    const raw = await res.text();
                    throw new Error(`Réponse non JSON reçue: ${raw.slice(0, 120)}`);
                }

                const data = await res.json();
                setArtisan(data);
                setLoading(false);
            } catch (e) {
                if (!isMounted) return;
                setError(e instanceof Error ? e.message : "Erreur inconnue");
                setLoading(false);
            }
        }

        fetchArtisan();

        return () => {
            isMounted = false;
        };
    }, [id]);

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
                    <ContactForm artisanId={id} artisanName={name} />
                </div>
            </div>
        </section>
    );
}