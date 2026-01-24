import React from "react";
import { useEffect, useState } from "react";
import { getArtisans } from "../services/artisans.services";

export function useArtisans() {
    const [artisans, setArtisans] = useState([]);
    const [ status, setStatus ] = useState('idle'); // 'idle' | 'loading' | 'error' | 'success'
    const [ error, setError ] = useState(null);

    useEffect(() => {
        let isMounted = true;

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

                if (isMounted) {
                    setArtisans(list);
                    setStatus('success');
                }
            } catch (e) {
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