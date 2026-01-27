import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArtisans } from "../services/api";
import ArtisanCardResult from "../components/Artisans/ArtisanCardResult";

// Composant page liste des artisans avec recherche
export default function ArtisansListPage() {
    // Gestion des paramètres de recherche dans l'URL
    const [searchParams, setSearchParams] = useSearchParams();
    // Récupération de la valeur initiale du paramètre "q"
    const initialQ = searchParams.get("q") || "";

    // États locaux pour la requête de recherche, la liste des artisans, le chargement et les erreurs
    const [query, setQuery] = useState(initialQ);
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Effet pour synchroniser l'état de la requête avec le paramètre URL
    useEffect(() => {
        setQuery(initialQ);
    }, [initialQ]);

    // Effet pour charger la liste des artisans au montage du composant
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError("");
                const data = await fetchArtisans();

                // Défensif : s'assurer d'un tableau
                if (!Array.isArray(data)) {
                    throw new Error("Format API inattendu (liste artisans non trouvée)");
                }

                setArtisans(data);
            } catch (e) {
                // Gestion des erreurs
                setError(e instanceof Error ? e.message : "Erreur inconnue");
            } finally {
                // Fin du chargement
                setLoading(false);
            }
        })();
    }, []);

    // Filtrage des artisans en fonction de la requête de recherche
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return artisans;
        return artisans.filter((a) => (a?.nom || "").toLowerCase().includes(q));
    }, [artisans, query]);

    // Gestion du changement de la requête de recherche
    const onChangeQuery = (value) => {
        setQuery(value);
        const v = value.trim();
        if (v) setSearchParams({ q: v });
        else setSearchParams({});
    };

    // Affichage des différents états (chargement, erreur)
    if (loading) return <section className="container py-3">Chargement...</section>;
    if (error) return <section className="container py-3">Erreur : {error}</section>;

    // Affichage de la liste des artisans avec le formulaire de recherche
    return (
        <section className="container py-3">
            <h1 className="page-title artisan">Rechercher mon artisan</h1>
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
