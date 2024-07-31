import { describe, expect, expectTypeOf, test } from "vitest";
import { getAllTasks } from "./getAllTasks";
import { inMemoryDB } from "../database-repositories/testerRepository";
import { createTask } from "./createTask";
import { Tasks } from "@prisma/client";

describe("get all tasks", async () => {
  test("deve retornar todas as tasks", async () => {
    const database = new inMemoryDB();
    const createAccess = new createTask(database);
    await createAccess.handle({ name: "test 0" });
    await createAccess.handle({ name: "test 1" });
    await createAccess.handle({ name: "test 2" });

    const getAllAccess = new getAllTasks(database);

    expect(getAllAccess.handle()).resolves.toHaveLength(3);
  });

  test("Deve retornar um array com as tasks", async () => {
    const database = new inMemoryDB();
    const access = new getAllTasks(database);

    expectTypeOf(access.handle()).resolves.toMatchTypeOf<Tasks[]>();
  });
});
