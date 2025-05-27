import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:3000', // Your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for cookies
});

// Request interceptor to add auth token to headers
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage if you want to use headers instead of cookies
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear any stored auth data
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');
            // Optionally redirect to login
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API functions
export const authAPI = {
    // User registration
    registerUser: async (userData) => {
        try {
            const response = await api.post('/auth/register/user', {
                identificationNumber: userData.identificationNumber,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                email: userData.email,
                password: userData.password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Company registration
    registerCompany: async (companyData) => {
        try {
            const response = await api.post('/auth/register/company', {
                companyName: companyData.companyName,
                industry: companyData.industry,
                companySize: companyData.companySize,
                location: companyData.location,
                phoneNumber: companyData.phoneNumber,
                email: companyData.email,
                password: companyData.password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // User login
    loginUser: async (credentials) => {
        try {
            const response = await api.post('/auth/login/user', {
                email: credentials.email,
                password: credentials.password,
            });

            // Store token and user data if you want to use localStorage
            if (response.data.data?.token) {
                localStorage.setItem('authToken', response.data.data.token);
                localStorage.setItem('userType', 'user');
                localStorage.setItem('userData', JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Company login
    loginCompany: async (credentials) => {
        try {
            const response = await api.post('/auth/login/company', {
                email: credentials.email,
                password: credentials.password,
            });

            // Store token and company data if you want to use localStorage
            if (response.data.data?.token) {
                localStorage.setItem('authToken', response.data.data.token);
                localStorage.setItem('userType', 'company');
                localStorage.setItem('userData', JSON.stringify(response.data.data.company));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Logout
    logout: async () => {
        try {
            const response = await api.post('/auth/logout');

            // Clear all stored auth data
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');

            return response.data;
        } catch (error) {
            // Even if the API call fails, clear local storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');
            throw error.response?.data || error.message;
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/user/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update user profile
    updateUser: async (userData) => {
        try {
            const response = await api.put('/auth/user/profile', userData);

            // Update stored user data
            if (response.data.data?.user) {
                localStorage.setItem('userData', JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get current company
    getCurrentCompany: async () => {
        try {
            const response = await api.get('/auth/company/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update company profile
    updateCompany: async (companyData) => {
        try {
            const response = await api.put('/auth/company/profile', companyData);

            // Update stored company data
            if (response.data.data?.company) {
                localStorage.setItem('userData', JSON.stringify(response.data.data.company));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Check authentication status
    checkAuth: () => {
        const token = localStorage.getItem('authToken');
        const userType = localStorage.getItem('userType');
        const userData = localStorage.getItem('userData');

        return {
            isAuthenticated: !!token,
            userType: userType,
            userData: userData ? JSON.parse(userData) : null,
            token: token
        };
    }
};

export default api;