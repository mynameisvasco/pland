import { addDays } from "date-fns";
import {
  Controller,
  Get,
  Post,
} from "nelso/build/decorators/RoutingDecorators";
import { Request } from "nelso/build/Request";
import { Response } from "nelso/build/Response";
import { AuthMiddleware } from "../Common/Middleware/AuthMiddleware";
import { LoginDto } from "./Dto/LoginDto";
import { RegisterDto } from "./Dto/RegisterDto";
import { UsersService } from "./UsersService";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("login")
  async login(req: Request, res: Response) {
    const dto = await req.body(LoginDto);
    const token = await this.usersService.login(dto);
    res.send({ accessToken: token, expiresAt: addDays(new Date(), 15) });
  }

  @Post("register")
  async register(req: Request, res: Response) {
    const dto = await req.body(RegisterDto);
    await this.usersService.register(dto);
    res.send({ message: "Account created successfully!" });
  }

  @Get("details", [AuthMiddleware])
  async details(req: Request, res: Response) {
    const user = await this.usersService.findByEmail(req.user.email);
    res.send({ user });
  }
}
