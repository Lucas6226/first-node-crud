import getAllTasks from "../models/getAllTasks"

export default async (req: any, res: any) => {
   const tasks = await getAllTasks()

   if (tasks instanceof Error) {
      return res.status(400).json({ msg: "internal server errro"})
   }
   
   return res.status(200).json(tasks)
}