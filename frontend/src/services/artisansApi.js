import { apiGet } from "./apiClient";

export function fetchArtisans() {
    return apiGet("/api/artisans");
}