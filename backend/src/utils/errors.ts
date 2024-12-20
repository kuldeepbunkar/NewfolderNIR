export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public errors: { [key: string]: string };

  constructor(message: string = 'Validation Error') {
    super(message, 400);
    this.errors = {};
  }

  addError(field: string, message: string) {
    this.errors[field] = message;
  }
} 