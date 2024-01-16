export default {
   validateBody: (req: any, res: any, next: any) => {
      const validTitle = req.body.title == undefined || req.body.title == '' 
      if (validTitle) {
         return res.status(400).json({ msg: "invalid title" });
      } 

      next()
   },
   validateStatus: (req: any, res: any, next: any) => {
      const validStatus = req.body.newStatus == undefined || req.body.newStatus == ''
      if (validStatus) {
         return res.status(400).json({ msg: "valor invalido"})
      }

      next()
   }
}