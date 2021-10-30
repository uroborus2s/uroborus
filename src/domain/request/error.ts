export class ServiceStatusError extends Error {
  private readonly status: string;

  constructor(status: string, message?: string) {
    super(message);
    this.status = status;
  }
}

export class ServiceTimeoutError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class ServiceUnknownError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class ServiceCodeError extends Error {
  private readonly code: number;

  constructor(code: number) {
    super('服务器返回code错误！');
    this.code = code;
  }
}
