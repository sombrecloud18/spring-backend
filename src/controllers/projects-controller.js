import express from 'express';
import * as projectsService from '../services/projects-service.js';
import { authenticateToken } from '../auth-middleware.js';
import { asyncMiddleware } from '../error-middleware.js';

const router = express.Router();

router.get('/projects', 
  authenticateToken,
  asyncMiddleware(async (req, res) => {
    const searchTerm = req.query.search || '';
    const projects = await projectsService.filterProjects(searchTerm);
    res.json(projects);
  })
);

export { router as projectsRouter };