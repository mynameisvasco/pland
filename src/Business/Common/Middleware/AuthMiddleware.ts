import {
  HttpException,
  Injectable,
  Middleware,
  Request,
  Response,
} from "kioto/build";
import { AuthedUser } from "../../../Domain/Models/AuthedUser";
import { JwtAuthService } from "../../../Infrastructure/Auth/JwtAuthService";

declare module "kioto/build/Request" {
  interface Request {
    user: AuthedUser;
  }
}

@Injectable()
export class AuthMiddleware extends Middleware {
  constructor(private authService: JwtAuthService) {
    super();
  }

  async handle(req: Request, res: Response, next: Function) {
    const { authService } = this;
    if (!req.headers.authorization) {
      throw new HttpException("Unauthorized.", 401);
    }
    try {
      const token = (req.headers.authorization as string)
        .replace("Bearer", "")
        .trim();
      req.user = authService.verifyTokenOrFail(token);
    } catch (e) {
      throw new HttpException("Unauthorized.", 401);
    }
    await next();
  }
}
