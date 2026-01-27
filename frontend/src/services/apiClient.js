const API_BASE_URL = import.meta.env.VITE_API_URL;

// Vérification de la présence de l'URL de base de l'API
export async function apiGet(path) {
    // Requête GET avec en-tête Accept: application/json
    const res = await fetch(`${API_BASE_URL}${path}`, {
        headers: {"Accept": "application/json"},
    });

    // Gestion des erreurs HTTP
    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const data = await res.json();
            if (data?.message) message = data.message;
        } catch {
            // Ignore json parse errors
        }
        throw new Error(message);
    }

    // Retour des données JSON
    return res.json();
}