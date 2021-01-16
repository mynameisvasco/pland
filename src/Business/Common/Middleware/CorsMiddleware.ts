import { Middleware, Request, Response } from "kioto/build";

export class CorsMiddleware extends Middleware {
  async handle(req: Request, res: Response, next: Function) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, accept-language"
    );
    res.setHeader("Access-Control-Allow-Credentials", true as any);
  }
}
