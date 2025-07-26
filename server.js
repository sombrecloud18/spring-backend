const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const admin = {
  username: 'admin',
  password: '1234',
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const projects = [
  {
    image: 'images/spring-boot.svg',
    title: 'Spring Boot',
    description:
      'Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.',
    currentVersion: '3.5.3',
    versionsCount: 9,
  },
  {
    image: 'images/spring-framework.svg',
    title: 'Spring Framework',
    description:
      'Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.',
    currentVersion: '6.2.8',
    versionsCount: 8,
  },
  {
    image: 'images/spring-data.svg',
    title: 'Spring Data',
    description:
      'Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.',
    currentVersion: '2025.0.1',
    versionsCount: 6,
  },
  {
    image: 'images/spring-cloud.svg',
    title: 'Spring Cloud',
    description:
      'Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.',
    currentVersion: '2025.0.0',
    versionsCount: 9,
  },
  {
    image: 'images/spring-data-flow.svg',
    title: 'Spring Cloud Data Flow',
    description:
      'Provides an orchestration service for composable data microservice applications on modern runtimes.',
    currentVersion: '2.11.5',
    versionsCount: 7,
  },
  {
    image: 'images/spring-security.svg',
    title: 'Spring Security',
    description:
      'Protects your application with comprehensive and extensible authentication and authorization support.',
    currentVersion: '6.5.1',
    versionsCount: 10,
  },
];

app.get('/api/projects', (request, response) => {
  const searchTerm = request.query.search?.toLowerCase() || '';

  const filtered = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  response.json(filtered);
});

app.post('/api/login', (request, response) => {
  const { username, password } = request.body;

  if (username === admin.username && password === admin.password) {
    response.json({ success: true, message: 'Welcome!' });
  } else {
    response.status(401).json({ success: false, message: 'Incorrect login or password' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
