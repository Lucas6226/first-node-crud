import connection from "./connection";

/**
 * @param param0 string
 * @returns object
 * @example createTask(title: 'task title')
 */
export default async (title: string) => {
   const created_at = new Date(Date.now())
   const query = 'insert into tasks values (DEFAULT, ?, ?, ?)'  
   const createdTask: any = await connection.execute(query, [title, 'pendente', created_at]) 
   
   return {taskId: createdTask[0].insertId, created_at}
}
