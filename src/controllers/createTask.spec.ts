import { describe, test, expect, vitest } from "vitest";
import { createTaskController } from "./createTask";
import { inMemoryDB } from "../database-repositories/testerRepository";
import { createTask } from "../models/createTask";
import { DefaultModelInterface } from "../models/DefaultModelInterface";

// Mocking express request and response objects
const mockRequest = (body: any) => ({ body });
const mockResponse = () => {
  const res: any = {};
  res.status = vitest.fn().mockReturnValue(res);
  res.send = vitest.fn().mockReturnValue(res);
  return res;
};

describe("Controller para a criação de tasks", () => {
  test("deve ser possivel criar uma task", async () => {
    const database = new inMemoryDB();
    const taskModel = new createTask(database);
    const controller = new createTaskController(taskModel);

    const req = mockRequest({ name: "New Task", status: "pending" });
    const res = mockResponse();
    const next = vitest.fn();

    await controller.handle(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("deve chamar o next com um erro quando a criação falhar", async () => {
    const database = new inMemoryDB();
    const taskModel = new createTask(database);
    const controller = new createTaskController(taskModel);

    const req = mockRequest({ name: "New Task", status: "pending" });
    const res = mockResponse();
    const next = vitest.fn();

    vitest.spyOn(taskModel, 'handle').mockRejectedValue(new Error("Failed to create task"));

    await controller.handle(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(201);
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error("Failed to create task"));
  });
});
