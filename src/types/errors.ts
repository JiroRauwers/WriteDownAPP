export class HTTPResponseError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export class FormFileSendingError extends HTTPResponseError {
  constructor(message: string, public file: File) {
    super(message, 500);
  }
}
