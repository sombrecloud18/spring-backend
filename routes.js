import { filterProjects, validateCredentials } from './service.js';

export const setupRoutes = (app) => {
  app.get('/api/projects', (req, res) => {
    const projects = filterProjects(req.query.search);
    res.json(projects);
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const result = validateCredentials(username, password);
    
    result.success ? res.json(result) : res.status(401).json(result);
  });
};