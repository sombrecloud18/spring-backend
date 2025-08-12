import * as projectsRepository from "../repositories/projects-repository.js";

export const filterProjects = async (searchTerm = '') => {
  try {
    const term = searchTerm.toLowerCase();
    const projects = await projectsRepository.getProjects();
    
    return projects.filter(project =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
    );
  } catch (error) {
    console.error('Error filtering projects:', error);
    throw error;
  }
};