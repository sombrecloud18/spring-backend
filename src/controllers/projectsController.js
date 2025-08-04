import * as projectsService from '../services/projectsService.js';

export const projects = async (req, res) => {
  try {
    const searchTerm = req.query.search || '';
    const projects = await projectsService.filterProjects(searchTerm);
    res.json(projects);
  } catch (error) {
    console.error('Ошибка при получении проектов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}