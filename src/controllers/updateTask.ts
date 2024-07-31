import { DefaultModelInterface } from "../models/DefaultModelInterface";
import { updateTask } from "../models/updateTask";
import { DefaultControllerClass } from "./DefaultControllerClass";

class updateTaskController extends DefaultControllerClass  {
  constructor(x: DefaultModelInterface = new updateTask()) {
    super(x)
  }

  async handle(req: any, res: any, next: any) {
    try {
      await this.DBaccess.handle({
        id: req.params.id,
        status: req.body.status,
      });
      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}

export { updateTaskController}