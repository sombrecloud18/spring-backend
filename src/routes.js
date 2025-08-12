import express from 'express';
import { login, refreshToken, logout, signup } from './controllers/auth-controller.js';
import { projects } from './controllers/projects-controller.js';
import { authenticateToken } from './auth-middleware.js';
import { validateSignup } from './validators.js';
import { asyncMiddleware, validateRequest, globalErrorHandler } from './error-middleware.js';


export const router = express.Router();

router.get('/projects', authenticateToken, projects);

router.post('/login', asyncMiddleware(login));
router.post('/signup', validateSignup, validateRequest, asyncMiddleware(signup));
router.post('/refresh-token', asyncMiddleware(refreshToken));
router.post('/logout', asyncMiddleware(logout));

router.use(globalErrorHandler);