import React from "react";
import { useEffect, useState } from "react";
import { getArtisans } from "../services/artisans.services";

// Hook personnalisé pour récupérer la liste des artisans
export function useArtisans() {
    const [artisans, setArtisans] = useState([]);
    const [ status, setStatus ] = useState('idle'); // 'idle' | 'loading' | 'error' | 'success'
    const [ error, setError ] = useState(null);

    // Effet pour charger les artisans au montage du composant
    useEffect(() => {
        let isMounted = true;

        // Fonction asynchrone pour charger les artisans
        async function load() {
            try {
                setStatus('loading');
                setError(null);

                const data = await getArtisans();

                // Défensif : s'assurer d'un tableau
                const list = Array.isArray(data) ? data : data?.data
                if (!Array.isArray(list)) {
                    throw new Error("Format API inattendu (liste artisans non trouvée");
                }

                // Met à jour l'état uniquement si le composant est toujours monté
                if (isMounted) {
                    setArtisans(list);
                    setStatus('success');
                }
            } catch (e) {
                // Met à jour l'état uniquement si le composant est toujours monté
                if (isMounted) {
                    setError(e instanceof Error ? e.message : "Erreur inconnue");
                    setStatus("error");
                }
            }
        }

        load();
        return () => {
            isMounted = false;
        };
    }, []);

    return { artisans, status, error };
}