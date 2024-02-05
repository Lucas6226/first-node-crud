import deleteTask from "../models/deleteTask"

export default async (req: any, res: any) => {
   const deleted = await deleteTask(req.params.id)

   if (deleted instanceof Error) {
      return deleted.message == "Database error"?
         res.status(404).json({ msg: "Internal server error"}):
         res.status(300).json({ msg: deleted.message })
   }
   
   return res.status(201).json({ msg: `success, delete task:`, deleted})
}