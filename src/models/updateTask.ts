import { appError } from "../error/appError";
// import { PrismaDBAccess } from "../repositories/prismaRepository";
// import { Repository } from "../repositories/repositoryInterface";
import { validateData } from "../services/validateData";
import { DefaultModelInterface, ModelClass } from "./DefaultModelInterface";

type UpDataInfos = {
  id: string;
  status: string;
};
class updateTask extends ModelClass implements DefaultModelInterface{
  async handle({ id, status }: UpDataInfos): Promise<void> {
    const validate = new validateData();
  
    if (!validate.validatePropertyInput(status)) {
      throw new appError({
        message: "invalid status",
        statusCode: 400,
        triggeredBy: "invalidUserInput",
        filePath: "crud-node/src/models/updateTask.ts",
        lineNumber: 24
      });
    }
  
    if (!(await this.DBAccess.checkIDExists(id))) {
      throw new appError({
        message: "invalid id",
        statusCode: 400,
        triggeredBy: "invalidUserInput",
        filePath: "crud-node/src/models/updateTask.ts",
        lineNumber: 34
      });
    }
    await this.DBAccess.update({ id, status });
  
  }
}

export { updateTask}

