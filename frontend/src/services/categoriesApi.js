import { apiGet } from "./apiClient";

// Fonction pour récupérer les catégories depuis l'API
export function fetchCategories() {
    return apiGet("/api/categories");
}