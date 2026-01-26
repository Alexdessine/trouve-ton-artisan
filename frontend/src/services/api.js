const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    throw new Error('VITE_API_URL manquant dans les variables d\'environnement');
}

async function apiGet(path, errorMessage) {
    const res = await fetch(`${API_BASE_URL}${path}`);
    if (!res.ok) throw new Error(`${errorMessage} (HTTP ${res.status})`);
    return res.json();
}

export async function fetchCategories() {
    return apiGet('/api/categories', 'Erreur chargement categories');
}

export async function fetchArtisans() {
    return apiGet('/api/artisans', 'Erreur chargement artisans');
}


export async function sendContactMessage(payload) {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    // On tente de lire le JSON même en cas d'erreur (backend renvoie JSON)
    let data = null;
    try {
        data = await res.json();
    } catch {
        // si la réponse n'est pas du JSON, data reste null
    }

    if (!res.ok) {
        const error = new Error(data?.message || "Erreur lors de l’envoi du message.");
        error.status = res.status;
        error.data = data;
        throw error;
    }

    return data;
}


console.log("API_BASE_URL =", API_BASE_URL);

