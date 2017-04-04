export class RestServiceError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "RestServiceError";
    this.stack = (<any> new Error()).stack;
  }
}
