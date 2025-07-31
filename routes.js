import express from 'express';
import { filterProjects, validateCredentials } from './service.js';

export const router = express.Router();

router.get('/projects', (req, res) => {
  const projects = filterProjects(req.query.search);
  res.json(projects);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const result = validateCredentials(username, password);
  result.success ? res.json(result) : res.status(401).json(result);
});
