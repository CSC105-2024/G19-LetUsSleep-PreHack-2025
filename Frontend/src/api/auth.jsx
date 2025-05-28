// authAPI.js - Fixed to work with HTTP-only cookies
import { Axios } from '../util/axiosInstance.jsx';

// Auth API functions
export const authAPI = {
    // User registration
    registerUser: async (userData) => {
        try {
            const response = await Axios.post('/auth/register/user', {
                identificationNumber: userData.identificationNumber,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                email: userData.email,
                password: userData.password,
                dateOfBirth: userData.dateOfBirth,
                hasExperience: userData.hasExperience,
                jobTitle: userData.jobTitle,
                companyName: userData.companyName,
                startYear: userData.startYear,
                startMonth: userData.startMonth,
                endYear: userData.endYear,
                endMonth: userData.endMonth,
                stillInRole: userData.stillInRole,
                resumeUrl: userData.resumeUrl,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Company registration
    registerCompany: async (companyData) => {
        try {
            const response = await Axios.post('/auth/register/company', {
                companyName: companyData.companyName,
                industry: companyData.industry,
                companySize: companyData.companySize,
                location: companyData.location,
                phoneNumber: companyData.phoneNumber,
                email: companyData.email,
                password: companyData.password,
                overview: companyData.overview,
                yearEst: companyData.yearEst,
                generalBe: companyData.generalBe,
                websiteUrl: companyData.websiteUrl,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // User login - Updated for cookie-based auth
    loginUser: async (credentials) => {
        try {
            const response = await Axios.post('/auth/login/user', {
                email: credentials.email,
                password: credentials.password,
            });

            // With HTTP-only cookies, we don't store tokens in localStorage
            // Instead, we store minimal user info for UI purposes
            if (response.data.success && response.data.data?.user) {
                // Store only non-sensitive user data for UI
                const userInfo = {
                    id: response.data.data.user.id,
                    firstName: response.data.data.user.firstName,
                    lastName: response.data.data.user.lastName,
                    email: response.data.data.user.email,
                    userType: 'user'
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Company login - Updated for cookie-based auth
    loginCompany: async (credentials) => {
        try {
            const response = await Axios.post('/auth/login/company', {
                email: credentials.email,
                password: credentials.password,
            });

            // Store only non-sensitive company data for UI
            if (response.data.success && response.data.data?.company) {
                const companyInfo = {
                    id: response.data.data.company.id,
                    companyName: response.data.data.company.companyName,
                    email: response.data.data.company.email,
                    userType: 'company'
                };
                localStorage.setItem('userInfo', JSON.stringify(companyInfo));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Logout - Updated for cookie-based auth
    logout: async () => {
        try {
            const response = await Axios.post('/auth/logout');

            // Clear stored user info
            localStorage.removeItem('userInfo');

            return response.data;
        } catch (error) {
            // Even if the API call fails, clear local storage
            localStorage.removeItem('userInfo');
            throw error.response?.data || error.message;
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await Axios.get('/auth/user/profile');

            // Update stored user info if successful
            if (response.data.success && response.data.data?.user) {
                const userInfo = {
                    id: response.data.data.user.id,
                    firstName: response.data.data.user.firstName,
                    lastName: response.data.data.user.lastName,
                    email: response.data.data.user.email,
                    userType: 'user'
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update user profile
    updateUser: async (userData) => {
        try {
            const response = await Axios.put('/auth/user/profile', userData);

            // Update stored user data
            if (response.data.success && response.data.data?.user) {
                const userInfo = {
                    id: response.data.data.user.id,
                    firstName: response.data.data.user.firstName,
                    lastName: response.data.data.user.lastName,
                    email: response.data.data.user.email,
                    userType: 'user'
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get current company
    getCurrentCompany: async () => {
        try {
            const response = await Axios.get('/auth/company/profile');

            // Update stored company info if successful
            if (response.data.success && response.data.data?.company) {
                const companyInfo = {
                    id: response.data.data.company.id,
                    companyName: response.data.data.company.companyName,
                    email: response.data.data.company.email,
                    userType: 'company'
                };
                localStorage.setItem('userInfo', JSON.stringify(companyInfo));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update company profile
    updateCompany: async (companyData) => {
        try {
            const response = await Axios.put('/auth/company/profile', companyData);

            // Update stored company data
            if (response.data.success && response.data.data?.company) {
                const companyInfo = {
                    id: response.data.data.company.id,
                    companyName: response.data.data.company.companyName,
                    email: response.data.data.company.email,
                    userType: 'company'
                };
                localStorage.setItem('userInfo', JSON.stringify(companyInfo));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Check authentication status - Updated for cookie-based auth
    checkAuth: () => {
        try {
            const userInfo = localStorage.getItem('userInfo');

            if (userInfo) {
                const parsedInfo = JSON.parse(userInfo);
                return {
                    isAuthenticated: true,
                    userType: parsedInfo.userType,
                    userData: parsedInfo,
                    // Note: We can't access the actual token since it's HTTP-only
                    token: null
                };
            }

            return {
                isAuthenticated: false,
                userType: null,
                userData: null,
                token: null
            };
        } catch (error) {
            console.error('Error checking auth status:', error);
            return {
                isAuthenticated: false,
                userType: null,
                userData: null,
                token: null
            };
        }
    },

    // Health check
    healthCheck: async () => {
        try {
            const response = await Axios.get('/health');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default authAPI;