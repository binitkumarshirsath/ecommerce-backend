class ErrorHandler extends Error {
  message: string;
  statusCode: number;
  error: string;

  stackTrace: void;
  constructor(message = "something went wrong", statusCode = 500, error = "") {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
    this.stackTrace = Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
