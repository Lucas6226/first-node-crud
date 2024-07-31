import express from "express";

import { createTaskController } from "./controllers/createTask";
import { deleteTaskController } from "./controllers/deleteTask";
import { getAllTasksController } from "./controllers/getAllTasks";
import { updateTaskController } from "./controllers/updateTask";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).send("Home");
});


router.get("/tasks", (req, res, next) => new getAllTasksController().handle(req, res, next));
router.post("/tasks", (req, res, next) => new createTaskController().handle(req, res, next));
router.put("/tasks/:id", (req, res, next) => new updateTaskController().handle(req, res, next));
router.delete("/tasks/:id", (req, res, next) => new deleteTaskController().handle(req, res, next));

export default router;
