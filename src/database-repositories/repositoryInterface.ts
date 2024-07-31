import { Tasks } from '@prisma/client'

type CreateParameter = {
  name: string, 
  status: string
}

type UpdateParameter = {
  id: string, 
  status: string
}

interface Repository {
  create(data: CreateParameter): Promise<void>
  delete(id: string): Promise<void>
  update(data: UpdateParameter): Promise<void>
  getAll(): Promise<Tasks[]>
  checkIDExists(id: string): Promise<boolean>
}

export { Repository } 