import { userModel } from '../models/auth.model.js';
import { companyModel } from '../models/company.model.js';

export const authController = {
    // User registration handler
    async registerUser(c) {
        try {
            const data = await c.req.json();

            // Validate required fields
            if (!data.firstName || !data.lastName || !data.email || !data.password) {
                return c.json({ error: 'Please provide all required fields' }, 400);
            }

            const user = await userModel.register(data);

            return c.json({
                message: 'User registered successfully',
                user
            }, 201);
        } catch (error) {
            console.error('Registration error:', error);
            return c.json({ error: error.message || 'Registration failed' }, 500);
        }
    },

    // User login handler
    async loginUser(c) {
        try {
            const { email, password } = await c.req.json();

            if (!email || !password) {
                return c.json({ error: 'Please provide email and password' }, 400);
            }

            const result = await userModel.login(email, password);

            // Set JWT token as a cookie
            c.cookie('auth_token', result.token, {
                httpOnly: true,
                maxAge: 86400000, // 1 day
                path: '/'
            });

            return c.json({
                message: 'Login successful',
                user: result.user
            });
        } catch (error) {
            console.error('Login error:', error);
            return c.json({ error: error.message || 'Login failed' }, 401);
        }
    },

    // Company registration handler
    async registerCompany(c) {
        try {
            const data = await c.req.json();

            // Validate required fields
            if (!data.companyName || !data.location || !data.password) {
                return c.json({ error: 'Please provide all required fields' }, 400);
            }

            const company = await companyModel.register(data);

            return c.json({
                message: 'Company registered successfully',
                company
            }, 201);
        } catch (error) {
            console.error('Registration error:', error);
            return c.json({ error: error.message || 'Registration failed' }, 500);
        }
    },

    // Company login handler
    async loginCompany(c) {
        try {
            const { name, password } = await c.req.json();

            if (!name || !password) {
                return c.json({ error: 'Please provide company name and password' }, 400);
            }

            const result = await companyModel.login(name, password);

            // Set JWT token as a cookie
            c.cookie('company_auth_token', result.token, {
                httpOnly: true,
                maxAge: 86400000, // 1 day
                path: '/'
            });

            return c.json({
                message: 'Login successful',
                company: result.company
            });
        } catch (error) {
            console.error('Login error:', error);
            return c.json({ error: error.message || 'Login failed' }, 401);
        }
    },

    // Logout handler
    async logout(c) {
        // Clear auth cookies
        c.cookie('auth_token', '', {
            httpOnly: true,
            maxAge: 0,
            path: '/'
        });

        c.cookie('company_auth_token', '', {
            httpOnly: true,
            maxAge: 0,
            path: '/'
        });

        return c.json({ message: 'Logged out successfully' });
    }
};
