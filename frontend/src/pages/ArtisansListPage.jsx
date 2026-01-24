import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArtisans } from "../services/api";
import ArtisanCardResult from "../components/Artisans/ArtisanCardResult";

export default function ArtisansListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQ = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQ);
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setQuery(initialQ);
    }, [initialQ]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError("");
                const data = await fetchArtisans();

                if (!Array.isArray(data)) {
                    throw new Error("Format API inattendu (liste artisans non trouvée)");
                }

                setArtisans(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Erreur inconnue");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return artisans;
        return artisans.filter((a) => (a?.nom || "").toLowerCase().includes(q));
    }, [artisans, query]);

    const onChangeQuery = (value) => {
        setQuery(value);
        const v = value.trim();
        if (v) setSearchParams({ q: v });
        else setSearchParams({});
    };

    if (loading) return <section className="container py-3">Chargement...</section>;
    if (error) return <section className="container py-3">Erreur : {error}</section>;

    return (
        <section className="container py-3">
            <h1 className="page-title">Rechercher mon artisan</h1>
            <div className="separationRed"></div>
            <h2 className="result">{filtered.length} résultats trouvés</h2>

            <input
                className="form-control mb-3"
                type="search"
                placeholder="Rechercher un artisan"
                value={query}
                onChange={(e) => onChangeQuery(e.target.value)}
            />

            {filtered.length === 0 ? (
                <div className="alert alert-secondary">Aucun résultat.</div>
            ) : (
                <div className="row g-3">
                    {filtered.map((a) => (
                        <div className="col-12 col-md-6" key={a.id_artisan}>
                            <ArtisanCardResult artisan={a} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
