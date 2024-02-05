import { prisma } from "../database/prismaClient";
import { CreatedTask } from "./types";

type UpDataInfos = {
  id: string;
  status: string;
};

export default async ({id, status}: UpDataInfos): Promise<ReferenceError | CreatedTask> => {
  let task = await prisma.tasks.update({ where: { id }, data: { status } });
  if (task instanceof Error) {
    return ReferenceError("Database Error");
  }
  return task;
};
