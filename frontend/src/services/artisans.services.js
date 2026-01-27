import { apiFetch } from "./api";

// Fonction pour récupérer les artisans depuis l'API
export function getArtisans() {
    return apiFetch("/api/artisans");
}