// axiosInstance.js - Proper configuration for your backend
import axios from 'axios';

// Create axios instance with correct base URL
const Axios = axios.create({
    baseURL: 'http://localhost:3000', // Changed to match your backend port
    timeout: 10000,
    withCredentials: true, // Important for cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token as fallback
Axios.interceptors.request.use(
    (config) => {
        // Add token from localStorage as fallback (your backend supports both cookies and headers)
        const token = localStorage.getItem('authToken');
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log the full request URL for debugging
        console.log(`Making request to: ${config.baseURL}${config.url}`);

        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
Axios.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status, response.statusText);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.status, error.response?.data);

        // Handle 401 errors globally
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');

            // Check if this is an auth request to avoid infinite loops
            const isAuthRequest = error.config?.url?.includes('/auth/login') ||
                error.config?.url?.includes('/auth/register');

            if (!isAuthRequest) {
                // Dispatch logout event instead of redirecting immediately
                window.dispatchEvent(new CustomEvent('auth:logout'));
            }
        }

        return Promise.reject(error);
    }
);

export { Axios };
export default Axios;