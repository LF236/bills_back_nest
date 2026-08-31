// 500 ERROR
export class ApplicationException extends Error {
  constructor(
    message: string,
    public readonly code: string = 'APPLICATION_ERROR'
  ) {
    super(message);
    this.name = 'ApplicationException';
  }
}