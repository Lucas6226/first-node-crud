import { prisma } from "../database/prismaClient";
import { CreatedTask } from "./types";

export default async (id: string): Promise<Error | CreatedTask > => {
  const task = await prisma.tasks.delete({ where: { id }})
  
  if (task instanceof Error) {
    return Error("Database error");
  }

  return task;
  
};
