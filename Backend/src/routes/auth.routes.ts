import { Hono } from 'hono';
import { authController } from '../controllers/auth.controller.js';

const authRoutes = new Hono();

// User authentication routes
authRoutes.post('/register/user', authController.registerUser);
authRoutes.post('/login/user', authController.loginUser);

// Company authentication routes
authRoutes.post('/register/company', authController.registerCompany);
authRoutes.post('/login/company', authController.loginCompany);

// Common routes
authRoutes.post('/logout', authController.logout);

export default authRoutes;