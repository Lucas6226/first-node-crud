import { Repository } from "../database-repositories/repositoryInterface";
import { prismaRepository } from "../database-repositories/prismaRepository";
import { Tasks } from "@prisma/client";

class ModelClass {
  constructor(public DBAccess: Repository = new prismaRepository()) {}
}

type Parameters = {
  id?: string;
  name?: string;
  status?: string;
  created_at?: Date;
};

interface DefaultModelInterface extends ModelClass {
  handle({}?: Parameters): Promise<void | Tasks[]>;
}

export { DefaultModelInterface, ModelClass };
