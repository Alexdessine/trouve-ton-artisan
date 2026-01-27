import { apiGet } from "./apiClient";

// Fonction pour récupérer les artisans depuis l'API
export function fetchArtisans() {
    return apiGet("/api/artisans");
}