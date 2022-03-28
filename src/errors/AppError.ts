class AppError {
  public readonly messager: string;

  public readonly statusCode: number;

  constructor(messager: string, statusCode = 400) {
    this.messager = messager;
    this.statusCode = statusCode;
  }
}

export default AppError;
