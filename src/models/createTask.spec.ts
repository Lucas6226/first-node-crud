import { test, expect, describe } from "vitest";
import { createTask } from "../models/createTask";
import { inMemoryDB } from "../database-repositories/testerRepository";

describe("Create task", async () => {
  test("criar uma nova task deve ser possivel", async () => {
    const database = new inMemoryDB();
    const access = new createTask(database);
    await access.handle({
      name: "name para teste",
      status: "status de teste",
    });

    expect(database.DB[0].name).toBe("name para teste");
    expect(database.DB[0].status).toBe("status de teste");
  });

  test("uma task não pode ser criada sem um name", async () => {
    const database = new inMemoryDB();
    const access = new createTask(database);

    await expect(
      // @ts-ignore
      access.handle({ status: "" })
    ).rejects.toThrow("invalid data");
  });

  test("uma task só é criada se o name for uma string valida", async () => {
    const database = new inMemoryDB();
    const access = new createTask(database);

    const useThisName = async (name: any) => {
      await expect(
        access.handle({
          name,
        })
      ).rejects.toThrow("invalid data");
    };

    await useThisName(""); // invalid string
    await useThisName(2); // invalid input
  });

  test("uma task só é criada se o status for, uma string valida, ou indefinido", async () => {
    const database = new inMemoryDB();
    const access = new createTask(database);

    const useThisStatus = async (status: any) => {
      await expect(
        access.handle({
          name: "task for test",
          status,
        })
      ).rejects.toThrow("invalid data");
    };

    await useThisStatus(""); // invalid string
    await useThisStatus(2); // invalid input

    await access.handle({ name: "task for test" });
    expect(database.DB[0].name).toBe("task for test");
    expect(database.DB[0].status).toBe("pendente");
  });
});
