import React, { Suspense, useEffect, useState, lazy } from "react";

// API
import { fetchCategories } from "../services/categoriesApi";
import { fetchArtisans } from "../services/artisansApi";

// Lazy-load du composant (code splitting)
const ArtisansCarousel = lazy(() => import("../components/Home/ArtisansCarousel"));

// Composant page d'accueil
export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Effet pour charger les catégories et les artisans au montage du composant
    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                // Démarre le chargement
                setLoading(true);
                setError("");

                // Chargement des catégories et des artisans en parallèle
                const [cats, arts] = await Promise.all([fetchCategories(), fetchArtisans()]);

                // Met à jour l'état uniquement si le composant n'a pas été démonté
                if (!cancelled) {
                    setCategories(Array.isArray(cats) ? cats : []);
                    setArtisans(Array.isArray(arts) ? arts : []);
                }
            } catch (e) {
                // Gestion des erreurs
                if (!cancelled) setError(e?.message ?? "Erreur de chargement");
            } finally {
                // Fin du chargement
                if (!cancelled) setLoading(false);
            }
        }

        // Nettoyage à la désactivation du composant
        load();
        return () => {
            cancelled = true;
        };
    }, []);

    // Affichage de la page d'accueil
    return (
        <main>
            <section className="list">
                <h1 className="page-title">Trouver mon artisan</h1>
                <div className="separation"></div>
                <h2 className="findArtisan">Comment trouver mon artisan ?</h2>
                <ol>
                    <li><span>1</span>Choisir la catégorie d’artisanat dans le menu</li>
                    <li><span>2</span>Choisir un artisan</li>
                    <li><span>3</span>Le contacter via le formulaire de contact</li>
                    <li><span>4</span>Une réponse sera apportée sous 48h.</li>
                </ol>
            </section>

            {!loading && !error && artisans.length > 0 && (
                // Affichage du carrousel des artisans
                <Suspense
                    fallback={
                        <section className="container pb-4 text-body-secondary">
                            Chargement des contenus…
                        </section>
                    }
                >
                    <ArtisansCarousel title="Top 3 des artisans" artisans={artisans} />
                </Suspense>
            )}

            {!loading && !error && artisans.length === 0 && (
                <section className="container pb-4 text-body-secondary">
                    Aucun artisan disponible.
                </section>
            )}

            {error && (
                <section className="container pb-4 text-danger">
                    {error}
                </section>
            )}
        </main>
    );
}
