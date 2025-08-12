import * as projectsService from '../services/projects-service.js';

export const projects = async (req, res) => {
    const searchTerm = req.query.search || '';
    const projects = await projectsService.filterProjects(searchTerm);
    res.json(projects);
}