import { DefaultModelInterface } from "../models/DefaultModelInterface";

interface DefaultControllerInterface {
  handle(req: any, res: any, next: any): any;
  DBaccess: DefaultModelInterface;
}

abstract class DefaultControllerClass implements DefaultControllerInterface {
  constructor(public DBaccess: DefaultModelInterface) {}

  abstract handle(req: any, res: any, next: any): any;
}


export { DefaultControllerClass };
