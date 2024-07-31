import { appError } from "./appError";

const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof appError) {
    if (err.triggeredBy == "invalidUserInput") {
      return res.status(err.statusCode).send(err.message);
    } else if (err.triggeredBy == "dbError") {
      return res.status(err.statusCode).send("Server error");
    }
  }

  console.log(`[ERROR]: ${err}`);
  return res.status(500).send("Server error");
};

export { errorHandler };
