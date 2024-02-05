import { createTask } from "../models/createTask";

export default async (req: any, res: any) => {
  const task = await createTask({
    name: req.body.name,
    status: req.body.status,
  });

  if (task instanceof Error) {
    return res.status(400).json({ msg: "internal server error" });
  }

  return res.status(201).json({ msg: "Created task!", taskInfos: task });
};
