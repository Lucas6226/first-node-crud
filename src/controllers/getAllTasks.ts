import { DefaultModelInterface } from "../models/DefaultModelInterface";
import { getAllTasks } from "../models/getAllTasks";
import { DefaultControllerClass } from "./DefaultControllerClass";

class getAllTasksController extends DefaultControllerClass {
  constructor(x: DefaultModelInterface = new getAllTasks()) {
    super(x)
  }

  async handle(req: any, res: any, next: any) {
    try {
      const tasks = await this.DBaccess.handle();
      return res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }  
  }
}

export { getAllTasksController }
