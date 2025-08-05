import express from 'express';
import { login, refreshToken, logout } from './controllers/authController.js';
import { projects } from './controllers/projectsController.js';
import { authenticateToken } from './authMiddleware.js';

export const router = express.Router();

router.get('/projects', authenticateToken, projects);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);