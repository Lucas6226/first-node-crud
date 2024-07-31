import { appError } from "../error/appError";
// import { PrismaDBAccess } from "../repositories/prismaRepository";
// import { Repository } from "../repositories/repositoryInterface";
import { validateData } from "../services/validateData";
import { DefaultModelInterface, ModelClass } from "./DefaultModelInterface";



type deleteTaskHandleParameters = {
  id: string
}

class deleteTask extends ModelClass implements DefaultModelInterface{
  async handle({ id }: deleteTaskHandleParameters): Promise<void> {
      const valid = new validateData();
    
      if (!valid.validatePropertyInput(id)) {
        throw new appError({
          message:"invalid user id",
          statusCode: 400,
          triggeredBy: "invalidUserInput",
          filePath: "crud-node/src/models/deleteTask.ts",
          lineNumber: 20
        });
      }
      if (!(await this.DBAccess.checkIDExists(id))) {
        throw new appError({
          message: "unknow user id",
          statusCode: 400,
          triggeredBy: "invalidUserInput",
          filePath: "crud-node/src/models/deleteTask.ts",
          lineNumber: 29
        });
      }
    
      await this.DBAccess.delete(id);
    
  }
}

export { deleteTask }


