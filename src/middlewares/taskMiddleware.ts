import { prisma } from "../database/prismaClient";

const validateBody = (req: any, res: any, next: any) => {
   const validName = req.body.name == undefined || req.body.name == '' 
   if (validName) {
      return res.status(400).json({ msg: "invalid name" });
   } 

   next()
}
const validateStatus = (req: any, res: any, next: any) => {
   const validStatus = req.body.newStatus == undefined || req.body.newStatus == ''
   if (validStatus) {
      return res.status(400).json({ msg: "valor invalido"})
   }

   next()
}
const validateId = async (req: any, res: any, next: any) => {
   const exist = await prisma.tasks.findUnique({ where: { id: req.params.id }})
   if (exist == null) {
      return res.status(300).json({ msg: "Invalid ID"})
   }

   if (exist instanceof Error) {
      return res.status(400).json({msg: "internal server erro"}) 
   }

   next()
}

export {validateBody, validateStatus, validateId}
