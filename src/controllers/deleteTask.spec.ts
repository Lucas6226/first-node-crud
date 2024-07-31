import { describe, test, expect, vitest } from "vitest";
import { deleteTaskController } from "./deleteTask";
import { inMemoryDB } from "../database-repositories/testerRepository";
import { deleteTask } from "../models/deleteTask";
import { DefaultModelInterface } from "../models/DefaultModelInterface";

// Mocking express request and response objects
const mockRequest = (params: any) => ({ params });
const mockResponse = () => {
  const res: any = {};
  res.status = vitest.fn().mockReturnValue(res);
  res.send = vitest.fn().mockReturnValue(res);
  return res;
};

describe("Controller para a deleção de tasks", () => {
  test("deve ser possivel deletar uma task", async () => {
    const database = new inMemoryDB(); // create fake database
    database.create({name: "is name", status: "progress"}) // add a task to he
    const id = database.DB[0].id // get id of the task


    const taskModel = new deleteTask(database);
    const controller = new deleteTaskController(taskModel);

    const req = mockRequest({ id });
    const res = mockResponse();
    const next = vitest.fn();

    await controller.handle(req, res, next);


    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("deve chamar o next com um erro quando a deleção falhar", async () => {
    const database = new inMemoryDB();
    const taskModel = new deleteTask(database);
    const controller = new deleteTaskController(taskModel);

    const req = mockRequest({ id: "123" });
    const res = mockResponse();
    const next = vitest.fn();

    vitest.spyOn(taskModel, 'handle').mockRejectedValue(new Error("Failed to delete task"));

    await controller.handle(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(201);
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error("Failed to delete task"));
  });

});
