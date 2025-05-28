import {Hono} from "hono";
import {JobController} from "../controllers/job.controller.ts";
//import {authMiddleware} from "../middlewares/auth.middlewares.js";

export const JobRouter = new Hono();

JobRouter.get("/", JobController.getAllJob);
JobRouter.get("/byID/:id", JobController.getJobbyID);
JobRouter.get("/bysearch/:search", JobController.getJobbySearch);
JobRouter.post("/filter", JobController.getbyfil);

JobRouter.post("/", JobController.createJob);

JobRouter.patch("/:id", JobController.EditJob);

JobRouter.delete("/:id", JobController.deleteJob);