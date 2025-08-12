import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './controllers/auth-controller.js';
import { projectsRouter } from './controllers/projects-controller.js';
import { globalErrorHandler } from './error-middleware.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', authRouter); 
app.use('/projects', projectsRouter);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});