const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchCategories() {
    const res = await fetch(`${API_BASE_URL}/api/categories`);
    if (!res.ok) throw new Error('Erreur chargement categories');
    return res.json();
}

export async function fetchArtisans() {
    const res = await fetch(`${API_BASE_URL}/api/artisans`);
    if (!res.ok) throw new Error('Erreur chargement artisans');
    return res.json();
}

console.log("API_BASE_URL =", import.meta.env.VITE_API_URL);

