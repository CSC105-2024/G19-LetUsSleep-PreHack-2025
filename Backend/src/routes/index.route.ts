import { Hono } from "hono";
import { cors } from 'hono/cors';
import authRoutes from './auth.routes.js';
import { companyRouter } from "./company.routes.ts";
import { JobRouter } from "./job.routes.ts";
// Import other route modules here as needed
// import userRoutes from './user.routes.js';
// import companyRoutes from './company.routes.js';
// import jobRoutes from './job.routes.js';

const mainRouter = new Hono();

// Add CORS middleware for frontend integration
mainRouter.use('/*', cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'], // Add your frontend URLs
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

// Mount authentication routes
mainRouter.route('/auth', authRoutes);
mainRouter.route("/company", companyRouter);
mainRouter.route('/job', JobRouter);

// Mount other routes here
// mainRouter.route('/api/users', userRoutes);
// mainRouter.route('/api/companies', companyRoutes);
// mainRouter.route('/api/jobs', jobRoutes);

// Health check endpoint
mainRouter.get('/health', (c) => {
    return c.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        message: 'Server is running'
    });
});

export { mainRouter };