class ApiResponse {
  message: string;
  data: Object;
  success: boolean;
  constructor(message = "success", data = {}) {
    this.message = message;
    this.data = data;
    this.success = true;
  }
}

export { ApiResponse };
