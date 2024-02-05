import { prisma } from "../database/prismaClient";
import { CreatedTask } from "./types"

type NewTask = {
  name: string;
  status?: string;
};


const createTask = async ({
  name,
  status,
}: NewTask): Promise<Error | CreatedTask> => {
  const task = await prisma.tasks.create({ data: { name, status } });

  if (task instanceof Error) {
    return new Error("Database Error");
  }

  return task;
};

export { createTask, CreatedTask };
