import { appError } from "../error/appError";
import { validateData } from "../services/validateData";
import { DefaultModelInterface, ModelClass } from "./DefaultModelInterface";

type NewTask = {
  name: string;
  status?: string;
};

class createTask extends ModelClass implements DefaultModelInterface {
  async handle({ name, status }: NewTask): Promise<void> {
    const Validate = new validateData();
    const statusIsValid = Validate.validatePropertyInput(status, true);
    const nameIsValid = Validate.validatePropertyInput(name);

    if (!statusIsValid || !nameIsValid)
      throw new appError({
        message: "invalid data",
        statusCode: 400,
        triggeredBy: "invalidUserInput",
        filePath: "crud-node/src/models/createTask.ts",
        lineNumber: 21,
      });
    await this.DBAccess.create({ name, status: status ?? "pendente" });
  }
}

export { createTask };
