import connection from "./connection";

export default async (datas: {id: string, status: string}) => {
   const query = 'update tasks set status = ? where id = ?'
   const update: any = await connection.execute(query, [datas.status, datas.id])
}