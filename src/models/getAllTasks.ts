import type { CreatedTask } from "./createTask";
import { prisma } from "../database/prismaClient";

export default async (): Promise<CreatedTask[] | Error> => {
  const tasks = await prisma.tasks.findMany()

  if (tasks instanceof Error) {
    return new Error("Database error")
  }
  
  return tasks;
};
