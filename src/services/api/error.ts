export class ApiError extends Error {
  
    status = 500;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status || 500;
  }
}
