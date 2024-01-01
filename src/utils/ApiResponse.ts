class ApiResponse {
  message: string;
  statusCode: number;
  data: Object;
  success: boolean;
  constructor(message = "success", data = {}, statusCode = 200) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.success = this.statusCode < 400;
  }
}

export { ApiResponse };
