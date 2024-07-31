import { DefaultModelInterface } from "../models/DefaultModelInterface"
import { deleteTask } from "../models/deleteTask"
import { DefaultControllerClass } from "./DefaultControllerClass"

class deleteTaskController extends DefaultControllerClass {
   constructor(x: DefaultModelInterface = new deleteTask()) {
      super(x)
   }

   async handle(req: any, res: any, next: any) {
      try {
         await this.DBaccess.handle({id: req.params.id});
         return res.status(201).send()
      } catch (err) {
         next(err)
      }   
   }
}

export { deleteTaskController} 

// export default async (req: any, res: any, next: any) => {
//    try {
//       const access = new deleteTask()
//       await access.handle({ id: req.params.id})
//       return res.status(201).send()
//    } catch (err) {
//       next(err)
//    }
// }