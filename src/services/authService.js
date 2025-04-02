import axios from 'axios';

// Créer une instance d'axios avec des configurations par défaut
const api = axios.create({
    baseURL: 'http://votre-api.com' // Remplacez par l'URL de votre API
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Retourne true si un token existe
};

// Fonction de déconnexion
export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirection vers la page de connexion
};

// Fonction pour effectuer des requêtes protégées
export const protectedRequest = async (method, url, data = null) => {
    try {
        const response = await api[method](url, data);
        return response.data;
    } catch (error) {
        // Gérer les erreurs d'authentification
        if (error.response && error.response.status === 401) {
            // Token invalide, déconnecter l'utilisateur
            logout();
        }
        throw error;
    }
};

export default api;