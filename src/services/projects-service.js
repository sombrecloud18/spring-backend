import * as projectsRepository from "../repositories/projects-repository.js";
import { ProjectsError } from "../error-middleware.js"; 

export const filterProjects = async (searchTerm = '') => {
    const term = searchTerm.toLowerCase();
    const projects = await projectsRepository.getProjects();
    if (!Array.isArray(projects)) {
    throw new ProjectsError('Projects operation failed', { type: typeof projects });
    }
     return projects.filter(project =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
    );
    
};