class ErrorHandler extends Error {
  message: string;
  statusCode: number;
  error: string;
  success: boolean;
  stackTrace: void;
  constructor(message = "something went wrong", statusCode = 500, error = "") {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
    this.success = false;
    this.stackTrace = Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
