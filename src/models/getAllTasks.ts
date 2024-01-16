import connection from "./connection";


export default async () => {
   const tasks = await connection.execute('SELECT * FROM tasks');
   return tasks[0];
}