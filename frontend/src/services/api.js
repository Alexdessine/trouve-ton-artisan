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

console.log("API_BASE_URL =", API_BASE_URL);

