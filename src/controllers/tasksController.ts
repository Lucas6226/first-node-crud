import getAllTasks from "../models/getAllTasks"
import createTask  from "../models/createTask"
import updateTask  from "../models/updateTask"
import deleteTask from "../models/deleteTask"

export default {
   getAllTasks: async (req: any, res: any) => {
      const tasks = await getAllTasks()
      
      return res.status(200).json(tasks)
   },
   createTask: async (req: any, res: any) => {
      const task = await createTask(req.body.title)
      return res.status(201).json({msg: "task created", taskInfo: { ...req.body, ...task }})
   },
   updateTask: async (req: any, res: any) => {
      const update = await updateTask({ id: req.params.id, status: req.body.newStatus})
      return res.status(204)
   },
   deleteTask: async (req: any, res: any) => {
      const deleted = await deleteTask(req.params.id)
      return res.status(201).json({msg: 'deleted'})
   }
}