import { test, expect, describe } from "vitest";
import { deleteTask } from "./deleteTask";
import { inMemoryDB } from "../database-repositories/testerRepository";

describe("Delete task", async () => {
  test("Se existente, uma task deve poder ser deletada", async () => {
    const database = new inMemoryDB();
    database.DB[0] = {
      id: "0",
      name: "Tester",
      status: "test",
      created_at: new Date(),
    };
    const access = new deleteTask(database);

    expect(database.DB[0].id).toEqual("0");

    await access.handle({ id: "0" });

    expect(database.DB).toHaveLength(0);
  });

  test("Se não existente uma task não deve poder ser deletada", async () => {
    const database = new inMemoryDB();
    const access = new deleteTask(database);

    expect(access.handle({ id: "invalid ID" })).rejects.toThrow(
      "unknow user id"
    );
  });

  test("Passar um id não string deve resultar em erro", async () => {
    const database = new inMemoryDB();
    const access = new deleteTask(database);

    //@ts-ignore
    expect(access.handle(2)).rejects.toThrow("invalid user id");
  });
});
