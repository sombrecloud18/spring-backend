import express from 'express';
import { login } from './controllers/authController.js';
import { projects } from './controllers/projectsController.js';

export const router = express.Router();

router.get('/projects', projects);

router.post('/login', login);