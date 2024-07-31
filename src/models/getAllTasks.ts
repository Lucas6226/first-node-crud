import { Tasks } from "@prisma/client";
import { appError } from "../error/appError";
// import { Repository } from "../repositories/repositoryInterface";
// import { PrismaDBAccess } from "../repositories/prismaRepository";
import { DefaultModelInterface, ModelClass } from "./DefaultModelInterface";

class getAllTasks extends ModelClass implements DefaultModelInterface{

  async handle(): Promise<Tasks[]> {
    const tasks = await this.DBAccess.getAll();
    if (!tasks)
      throw new appError({
        message: "database error",
        statusCode: 500,
        triggeredBy: "dbError",
        filePath: "crud-node/src/models/getAllTasks.ts",
        lineNumber: 7
      });
    return tasks;
  };
}

export { getAllTasks };
