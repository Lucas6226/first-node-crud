import { describe, expect, test } from "vitest";
import { inMemoryDB } from "../database-repositories/testerRepository";
import { updateTask } from "./updateTask";
import { createTask } from "./createTask";

describe("update tasks", () => {
  test("Se valido um status pode ser atualizado, se não, deve causar erro", async () => {
    const database = new inMemoryDB();
    const access = new updateTask(database);
    database.DB.push({
      id: "ID",
      name: "task",
      status: "old status",
      created_at: new Date(),
    });
    expect(database.DB[0].id).toBe("ID");

    const useThisInvalidStatus = (status: any) => {
      expect(access.handle({ id: "ID", status })).rejects.toThrow(
        "invalid status"
      );
    };
    useThisInvalidStatus(1);
    useThisInvalidStatus("");

    await access.handle({ id: "ID", status: "new status" });
    expect(database.DB[0].status).toBe("new status");
  });

  test("um ID invalido deve causar erro", async () => {
    const database = new inMemoryDB();
    const access = new updateTask(database);

    const useThisID = (id: any) => {
      expect(access.handle({ id, status: "status" })).rejects.toThrow(
        "invalid id"
      );
    };

    useThisID(2);
    useThisID("");
    useThisID(" x ");
  });
});
