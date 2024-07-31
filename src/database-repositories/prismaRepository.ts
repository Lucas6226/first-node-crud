import { Repository } from "./repositoryInterface";
import { Tasks } from "@prisma/client";
import { prisma } from "../database/prismaDatabseAccess";

class prismaRepository implements Repository {
  private db = prisma
  
  async create(data: { name: string; status: string }): Promise<void> {
    await this.db.tasks.create({ data });
  }
  async delete(id: string): Promise<void> {
    await this.db.tasks.delete({ where: { id } });
  }
  async update({id, status}: { id: string; status: string }): Promise<void> {
    await this.db.tasks.update({ where: { id }, data: { status }})
  }
  async getAll(): Promise<Tasks[]> {
    const tasks = await this.db.tasks.findMany()
    return tasks
  }
  async checkIDExists(id: string): Promise<boolean> {
    const task = await this.db.tasks.findUnique({ where: { id }})    
    return task? true : false
  }
}

export { prismaRepository }
