import { apiFetch } from "./api";

export function getArtisans() {
    return apiFetch("/api/artisans");
}