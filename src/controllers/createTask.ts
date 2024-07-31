import { DefaultModelInterface } from "../models/DefaultModelInterface";
import { createTask } from "../models/createTask";
import { DefaultControllerClass } from "./DefaultControllerClass";

class createTaskController extends DefaultControllerClass {
  constructor(x: DefaultModelInterface = new createTask()) {
    super(x);
  }

  async handle(req: any, res: any, next: any) {
    try {
      await this.DBaccess.handle({ 
        name: req.body.name,
        status: req.body.status,
      });

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}

export { createTaskController };
