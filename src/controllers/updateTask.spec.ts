import { describe, test, expect, vitest } from "vitest";
import { updateTaskController } from "./updateTask";
import { inMemoryDB } from "../database-repositories/testerRepository";
import { updateTask } from "../models/updateTask";
import { DefaultModelInterface } from "../models/DefaultModelInterface";

// Mocking express request and response objects
const mockRequest = (params: any, body: any) => ({ params, body });
const mockResponse = () => {
  const res: any = {};
  res.status = vitest.fn().mockReturnValue(res);
  res.send = vitest.fn().mockReturnValue(res);
  return res;
};

describe("Controller para a atualização de tasks", () => {
  test("deve ser possível atualizar uma task", async () => {
    const database = new inMemoryDB();
    const taskModel = new updateTask(database);
    taskModel.handle = vitest.fn().mockReturnValue(null);
    const controller = new updateTaskController(taskModel);

    const req = mockRequest({ id: "123" }, { status: "completed" });
    const res = mockResponse();
    const next = vitest.fn();

    await controller.handle(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
    expect(taskModel.handle).toHaveBeenCalledWith({ id: "123", status: "completed"})
    expect(next).not.toHaveBeenCalled();
  });

  test("deve chamar o next com um erro quando a atualização falhar", async () => {
    const database = new inMemoryDB();
    const taskModel = new updateTask(database);
    const controller = new updateTaskController(taskModel);

    const req = mockRequest({ id: "123" }, { status: "completed" });
    const res = mockResponse();
    const next = vitest.fn();

    vitest.spyOn(taskModel, 'handle').mockRejectedValue(new Error("Failed to update task"));

    await controller.handle(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(201);
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error("Failed to update task"));
  });
});
