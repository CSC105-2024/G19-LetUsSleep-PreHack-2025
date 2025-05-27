import { userModel, companyModel } from '../models/auth.model.js';
import { setUserAuthCookie, setCompanyAuthCookie, clearAuthCookies } from '../middlewares/auth.middlewares.js';

export const authController = {
    // User registration handler
    async registerUser(c: any) {
        try {
            const data = await c.req.json();

            // Validate required fields
            if (!data.firstName || !data.lastName || !data.email || !data.password) {
                return c.json({
                    success: false,
                    error: 'Please provide all required fields (firstName, lastName, email, password)'
                }, 400);
            }

            // Check if user already exists
            const existingUser = await userModel.getUserByEmail(data.email);
            if (existingUser) {
                return c.json({
                    success: false,
                    error: 'User with this email already exists'
                }, 400);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                return c.json({
                    success: false,
                    error: 'Please provide a valid email address'
                }, 400);
            }

            // Validate password strength
            if (data.password.length < 6) {
                return c.json({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                }, 400);
            }

            const user = await userModel.register(data);

            return c.json({
                success: true,
                message: 'User registered successfully',
                data: { user }
            }, 201);
        } catch (error: any) {
            console.error('User registration error:', error);
            return c.json({
                success: false,
                error: error.message || 'Registration failed'
            }, 500);
        }
    },

    // User login handler
    async loginUser(c: any) {
        try {
            const { email, password } = await c.req.json();

            if (!email || !password) {
                return c.json({
                    success: false,
                    error: 'Please provide email and password'
                }, 400);
            }

            const result = await userModel.login(email, password);

            // Set JWT token using the helper function
            const token = await setUserAuthCookie(c, {
                userId: result.user.id,
                email: result.user.email
            });

            return c.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: result.user,
                    token: token
                }
            });
        } catch (error: any) {
            console.error('User login error:', error);
            return c.json({
                success: false,
                error: error.message || 'Login failed'
            }, 401);
        }
    },

    // Company registration handler
    async registerCompany(c: any) {
        try {
            const data = await c.req.json();

            // Validate required fields
            if (!data.companyName || !data.location || !data.email || !data.password) {
                return c.json({
                    success: false,
                    error: 'Please provide all required fields (companyName, location, email, password)'
                }, 400);
            }

            // Check if company already exists
            const existingCompany = await companyModel.getCompanyByEmail(data.email);
            if (existingCompany) {
                return c.json({
                    success: false,
                    error: 'Company with this email already exists'
                }, 400);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                return c.json({
                    success: false,
                    error: 'Please provide a valid email address'
                }, 400);
            }

            // Validate password strength
            if (data.password.length < 6) {
                return c.json({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                }, 400);
            }

            const company = await companyModel.register(data);

            return c.json({
                success: true,
                message: 'Company registered successfully',
                data: { company }
            }, 201);
        } catch (error: any) {
            console.error('Company registration error:', error);
            return c.json({
                success: false,
                error: error.message || 'Registration failed'
            }, 500);
        }
    },

    // Company login handler
    async loginCompany(c: any) {
        try {
            const { email, password } = await c.req.json();

            if (!email || !password) {
                return c.json({
                    success: false,
                    error: 'Please provide email and password'
                }, 400);
            }

            const result = await companyModel.login(email, password);

            // Set JWT token using the helper function
            const token = await setCompanyAuthCookie(c, {
                companyId: result.company.id,
                email: result.company.email
            });

            return c.json({
                success: true,
                message: 'Company login successful',
                data: {
                    company: result.company,
                    token: token
                }
            });
        } catch (error: any) {
            console.error('Company login error:', error);
            return c.json({
                success: false,
                error: error.message || 'Login failed'
            }, 401);
        }
    },

    // Get current user profile
    async getCurrentUser(c: any) {
        try {
            const userId = c.get('userId');
            if (!userId) {
                return c.json({
                    success: false,
                    error: 'User not authenticated'
                }, 401);
            }

            const user = await userModel.getUserById(userId);
            return c.json({
                success: true,
                data: { user }
            });
        } catch (error: any) {
            console.error('Get user error:', error);
            return c.json({
                success: false,
                error: error.message || 'Failed to get user'
            }, 500);
        }
    },

    // Update user profile
    async updateUser(c: any) {
        try {
            const userId = c.get('userId');
            if (!userId) {
                return c.json({
                    success: false,
                    error: 'User not authenticated'
                }, 401);
            }

            const data = await c.req.json();

            // Check if email is being updated and if it already exists
            if (data.email) {
                const existingUser = await userModel.getUserByEmail(data.email);
                if (existingUser && existingUser.id !== parseInt(userId.toString())) {
                    return c.json({
                        success: false,
                        error: 'Email is already in use by another user'
                    }, 400);
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    return c.json({
                        success: false,
                        error: 'Please provide a valid email address'
                    }, 400);
                }
            }

            // Validate password strength if provided
            if (data.password && data.password.length < 6) {
                return c.json({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                }, 400);
            }

            const user = await userModel.updateUser(userId, data);

            return c.json({
                success: true,
                message: 'Profile updated successfully',
                data: { user }
            });
        } catch (error: any) {
            console.error('Update user error:', error);
            return c.json({
                success: false,
                error: error.message || 'Failed to update profile'
            }, 500);
        }
    },

    // Get current company profile
    async getCurrentCompany(c: any) {
        try {
            const companyId = c.get('companyId');
            if (!companyId) {
                return c.json({
                    success: false,
                    error: 'Company not authenticated'
                }, 401);
            }

            const company = await companyModel.getCompanyById(companyId);
            return c.json({
                success: true,
                data: { company }
            });
        } catch (error: any) {
            console.error('Get company error:', error);
            return c.json({
                success: false,
                error: error.message || 'Failed to get company'
            }, 500);
        }
    },

    // Update company profile
    async updateCompany(c: any) {
        try {
            const companyId = c.get('companyId');
            if (!companyId) {
                return c.json({
                    success: false,
                    error: 'Company not authenticated'
                }, 401);
            }

            const data = await c.req.json();

            // Check if email is being updated and if it already exists
            if (data.email) {
                const existingCompany = await companyModel.getCompanyByEmail(data.email);
                if (existingCompany && existingCompany.id !== parseInt(companyId.toString())) {
                    return c.json({
                        success: false,
                        error: 'Email is already in use by another company'
                    }, 400);
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    return c.json({
                        success: false,
                        error: 'Please provide a valid email address'
                    }, 400);
                }
            }

            // Validate password strength if provided
            if (data.password && data.password.length < 6) {
                return c.json({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                }, 400);
            }

            const company = await companyModel.updateCompany(companyId, data);

            return c.json({
                success: true,
                message: 'Company profile updated successfully',
                data: { company }
            });
        } catch (error: any) {
            console.error('Update company error:', error);
            return c.json({
                success: false,
                error: error.message || 'Failed to update company profile'
            }, 500);
        }
    },

    // Logout handler
    async logout(c: any) {
        try {
            // Clear auth cookies using helper function
            clearAuthCookies(c);

            return c.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error: any) {
            console.error('Logout error:', error);
            return c.json({
                success: false,
                error: 'Logout failed'
            }, 500);
        }
    }
};