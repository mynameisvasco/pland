import { Injectable } from "nelso/build/decorators/DiDecorators";
import { HttpException } from "nelso/build/HttpException";
import { Middleware } from "nelso/build/Middleware";
import { Request } from "nelso/build/Request";
import { Response } from "nelso/build/Response";
import { AuthedUser } from "../../../Domain/Models/AuthedUser";
import { JwtAuthService } from "../../../Infrastructure/Auth/JwtAuthService";

declare module "nelso/build/Request" {
  interface Request {
    user: AuthedUser;
  }
}

@Injectable()
export class AuthMiddleware extends Middleware {
  constructor(private authService: JwtAuthService) {
    super();
  }

  handle(req: Request, res: Response, next: Function) {
    const { authService } = this;
    if (!req.headers.authorization) {
      throw new HttpException("Unauthorized.", 401);
    } else {
      const token = req.headers.authorization.substr(7);
      req.user = authService.verifyTokenOrFail(token);
    }
    next();
  }
}
