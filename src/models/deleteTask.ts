import connection from "./connection";

export default async (id: string) => {
   await connection.execute(`delete from tasks where id = ${id}`)
}