const { projects, admin } = require('./constants.js');

exports.filterProjects = (searchTerm = '') => {
  const term = searchTerm.toLowerCase();
  return projects.filter(
    project =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
  );
};

exports.validateCredentials = (username, password) => {
  const isAdmin = username === admin.username && password === admin.password;
  return {
    success: isAdmin,
    message: isAdmin ? 'Welcome!' : 'Incorrect login or password'
  };
};