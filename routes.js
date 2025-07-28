const express = require('express');
const { filterProjects,  validateCredentials } = require('./service.js');

const router = express.Router();

router.get('/projects', (req, res) => {
  const projects = filterProjects(req.query.search);
  res.json(projects);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const result = validateCredentials(username, password);
  result.success ? res.json(result) : res.status(401).json(result);
});

module.exports = router;