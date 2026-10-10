// 400 ERROR
export class BadRequestException extends Error {
  constructor(
    message: string,
    public readonly code: string = 'BAD_REQUEST_EXCEPTION'
  ) {
    super(message);
    this.name = 'BadRequestException'
  }
}