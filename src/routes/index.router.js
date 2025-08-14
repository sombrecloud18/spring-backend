import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { projectsRouter } from "./projects.router.js";

export const router = new Router;

router.use('/', authRouter); 
router.use('/', projectsRouter);
