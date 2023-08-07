export interface IUsecase<Request, Response> {
  execute: (request: Request) => Promise<Response>;
}
