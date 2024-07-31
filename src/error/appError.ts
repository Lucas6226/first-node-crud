type Triggers = "invalidUserInput" | "dbError";

interface ErrorParameters {
  readonly message: string,
  readonly statusCode: number,
  readonly triggeredBy: Triggers,
  readonly filePath: string,
  readonly lineNumber: number
}

class appError extends Error {
  constructor(infos: ErrorParameters,
    readonly message: string = infos.message,
    readonly statusCode: number = infos.statusCode,
    readonly triggeredBy: Triggers = infos.triggeredBy,
    readonly filePath: string = infos.filePath,
    readonly lineNumber: number = infos.lineNumber
  ) {
    super(message);
  }
}

export { appError };
