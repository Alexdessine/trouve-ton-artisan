import React, { useEffect, useMemo, useState } from "react";
import HowToFind from "../components/Home/HowToFind";
import TopArtisansCarousel from "../components/Home/TopArtisans";
import { fetchCategories } from "../services/categoriesApi";
import { fetchArtisans } from "../services/artisansApi";
import ArtisansCarousel from "../components/home/ArtisansCarousel";

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError("");

                const [cats, arts] = await Promise.all([fetchCategories(), fetchArtisans()]);

                if (!cancelled) {
                    setCategories(Array.isArray(cats) ? cats : []);
                    setArtisans(Array.isArray(arts) ? arts : []);
                }
            } catch (e) {
                if (!cancelled) setError(e?.message ?? "Erreur de chargement");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    const top3 = useMemo(
        () => artisans.filter((a) => a.is_favori === 1).slice(0, 3),
        [artisans]
    );

    const howSteps = [
        { heading: "1.", text: "Choisir la catégorie d’artisanat dans le menu" },
        { heading: "2.", text: "Choisir un artisan" },
        { heading: "3.", text: "Le contacter via le formulaire de contact" },
        { heading: "4.", text: "Une réponse sera apportée sous 48h." },
    ];

    return (
        <main>
            <section className="list">
                <h1 className="page-title">Trouver mon artisan</h1>
                <div className="separation"></div>
                <h2 className="findArtisan">Comment trouver mon artisan ?</h2>
                <ol>
                    <li>Choisir la catégorie d’artisanat dans le menu</li>
                    <li>Choisir un artisan</li>
                    <li>Le contacter via le formulaire de contact</li>
                    <li>Une réponse sera apportée sous 48h.</li>
                </ol>
            </section>
            <section className="Top">
                
            </section>

            {/* <HowToFind title="Comment trouver un artisan ?" steps={howSteps} /> */}

            {/* Si tu veux afficher aussi les catégories sur la home */}
            {/* <section className="container py-4">
                <div className="title-accent mb-2" />
                <h2 className="section-title mb-3">Catégories</h2>

                {loading && <div className="text-body-secondary">Chargement…</div>}
                {!loading && error && <div className="alert alert-warning mb-0">{error}</div>}

                {!loading && !error && (
                    <div className="d-flex gap-2 flex-wrap">
                        {categories.map((c) => (
                            <span key={c.id_categorie} className="badge text-bg-light border">
                                {c.label}
                            </span>
                        ))}
                    </div>
                )}
            </section> */}

            

            {!loading && !error && artisans.length > 0 && (
                <ArtisansCarousel title="Top 3 des artisans" artisans={artisans} />
            )}

            {!loading && !error && artisans.length === 0 && (
                <section className="container pb-4 text-body-secondary">
                    Aucun artisan disponible.
                </section>
            )}

        </main>
    );
}
