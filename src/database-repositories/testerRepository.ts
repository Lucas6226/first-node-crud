import { Tasks } from "@prisma/client";
import { Repository } from "./repositoryInterface";
import { randomUUID } from "node:crypto";

class inMemoryDB implements Repository {
  public DB: Tasks[] = [];

  async create(data: { name: string; status: string }): Promise<void> {
    this.DB.push({
      id: randomUUID(),
      name: data.name,
      status: data.status,
      created_at: new Date(),
    });
  }
  async delete(id: string): Promise<void> {
    this.DB.map((item, index) => {
      if (item.id == id) {
        this.DB.splice(index);
      }
    });
  }
  async update(data: { id: string; status: string }): Promise<void> {
    this.DB.map((item, index) => {
      if (item.id == data.id) {
        this.DB[index].status = data.status;
      }
    });
  }
  async getAll(): Promise<Tasks[]> {
    return this.DB;
  }
  async checkIDExists(id: string): Promise<boolean> {
    let existing = false
    this.DB.map((item) => {
      if (item.id == id) {
        existing = true
      }
    });
    return existing 
  }
}

export { inMemoryDB }