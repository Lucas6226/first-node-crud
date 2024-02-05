import updateTask from "../models/updateTask";

export default async (req: any, res: any) => {
  const update = await updateTask({
    id: req.params.id,
    status: req.body.newStatus,
  });

  if (update instanceof Error) {
   return update.message == "Database Error"? 
      res.status(400).json({ msg: "Internal server error"}):
      res.status(300).json({ msg: `${update.message}`})
  }

  return res.status(201).json({ msg: "Task updated for:", update });
};
