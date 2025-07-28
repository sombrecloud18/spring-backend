import { projects, admin } from './constants.js';

export const filterProjects = (searchTerm = '') => {
  const term = searchTerm.toLowerCase();
  return projects.filter(
    project =>
      project.title.toLowerCase().includes(term) ||project.description.toLowerCase().includes(term)
  );
};

export const validateCredentials = (username, password) => {
  const isAdmin = 
    username === admin.username && password === admin.password;
  
  return {
    success: isAdmin,
    message: isAdmin ? 'Welcome!' : 'Incorrect login or password'
  };
};