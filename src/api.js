const API_URL = 'http://127.0.0.1:8000/api';

export async function api(path, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    if (response.status === 204) {
        return null;
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}