import { Hono } from 'hono';
import { authController } from '../controllers/auth.controller.js';
import { userAuthMiddleware, companyAuthMiddleware } from '../middlewares/auth.middlewares.js';

const authRoutes = new Hono();

// Public authentication routes
authRoutes.post('/register/user', authController.registerUser);
authRoutes.post('/login/user', authController.loginUser);
authRoutes.post('/register/company', authController.registerCompany);
authRoutes.post('/login/company', authController.loginCompany);
authRoutes.post('/logout', authController.logout);

// Protected user routes
authRoutes.get('/user/profile', userAuthMiddleware, authController.getCurrentUser);
authRoutes.put('/user/profile', userAuthMiddleware, authController.updateUser);

// Protected company routes
authRoutes.get('/company/profile', companyAuthMiddleware, authController.getCurrentCompany);
authRoutes.put('/company/profile', companyAuthMiddleware, authController.updateCompany);

export default authRoutes;