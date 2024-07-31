import { describe, test, expect, vitest, Task } from "vitest";
import { getAllTasksController } from "./getAllTasks";
import { inMemoryDB } from "../database-repositories/testerRepository";
import { getAllTasks } from "../models/getAllTasks";
import { Tasks } from "@prisma/client";
import { DefaultModelInterface } from "../models/DefaultModelInterface";

// Mocking express request and response objects
const mockRequest = () => ({});
const mockResponse = () => {
  const res: any = {};
  res.status = vitest.fn().mockReturnValue(res);
  res.json = vitest.fn().mockReturnValue(res);
  return res;
};

describe("Controller para obter todas as tasks", () => {
  test("deve ser possivel obter todas as tasks", async () => {
    const database = new inMemoryDB();
    const taskModel = new getAllTasks(database);
    const controller = new getAllTasksController(taskModel);

    const req = mockRequest();
    const res = mockResponse();
    const next = vitest.fn();

    
    const tasks = [
      { id: "1", name: "Task 1", status: "pending", created_at: new Date() },
      { id: "2", name: "Task 2", status: "completed", created_at: new Date() },
    ] as Tasks[];

    vitest.spyOn(taskModel, 'handle').mockResolvedValue(tasks);

    await controller.handle(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
    expect(next).not.toHaveBeenCalled();
  });

  test("deve chamar o next com um erro quando a obtenção falhar", async () => {
    const database = new inMemoryDB();
    const taskModel = new getAllTasks(database);
    const controller = new getAllTasksController(taskModel);

    const req = mockRequest();
    const res = mockResponse();
    const next = vitest.fn();

    vitest.spyOn(taskModel, 'handle').mockRejectedValue(new Error("Failed to get tasks"));

    await controller.handle(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(200);
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error("Failed to get tasks"));
  });
});
