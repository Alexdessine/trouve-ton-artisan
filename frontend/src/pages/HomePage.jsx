import React, { useEffect, useMemo, useState } from "react";
import HowToFind from "../components/Home/HowToFind";
import TopArtisansCarousel from "../components/Home/TopArtisans";
import { fetchCategories } from "../services/categoriesApi";
import { fetchArtisans } from "../services/artisansApi";
import ArtisansCarousel from "../components/Home/ArtisansCarousel";

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
                    <li><span>1</span>Choisir la catégorie d’artisanat dans le menu</li>
                    <li><span>2</span>Choisir un artisan</li>
                    <li><span>3</span>Le contacter via le formulaire de contact</li>
                    <li><span>4</span>Une réponse sera apportée sous 48h.</li>
                </ol>
            </section>
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
