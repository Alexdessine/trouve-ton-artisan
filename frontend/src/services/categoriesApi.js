import { apiGet } from "./apiClient";

export function fetchCategories() {
    return apiGet("/api/categories");
}