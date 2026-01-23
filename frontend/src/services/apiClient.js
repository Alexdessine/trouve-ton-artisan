const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function apiGet(path) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        headers: {"Accept": "application/json"},
    });

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

    return res.json();
}