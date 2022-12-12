class ApiError {
  statusCode: number;
  body: string;
  headers: { 'Content-Type': string; };
  constructor(
    message = 'An error occurred',
    statusCode = 500,
  ) {
    const body = JSON.stringify({ message });
    this.statusCode = statusCode;
    this.body = body;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}

export default ApiError;