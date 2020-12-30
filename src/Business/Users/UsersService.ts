import { DatabaseService } from "../../Infrastructure/Database/DatabaseService";
import { LoginDto } from "./Dto/LoginDto";
import { RegisterDto } from "./Dto/RegisterDto";
import { JwtAuthService } from "../../Infrastructure/Auth/JwtAuthService";
import { AuthedUser } from "../../Domain/Models/AuthedUser";
import { Injectable, HttpException } from "nelso/build";

@Injectable()
export class UsersService {
  constructor(
    private authService: JwtAuthService,
    private dbService: DatabaseService
  ) {}

  async findByEmail(email: string) {
    return await this.dbService.users.findOne({ where: { email } });
  }

  async login(dto: LoginDto) {
    const { authService } = this;
    const user = await this.findByEmail(dto.email);
    if (!user) throw new HttpException("Provided credentials are wrong.", 400);
    try {
      authService.verifyPasswordOrFail(dto.password, user.password);
    } catch (e) {
      throw new HttpException("Provided credentials are wrong.", 400);
    }
    return authService.createToken(user as AuthedUser);
  }

  async register(dto: RegisterDto) {
    const { dbService, authService } = this;
    const user = dbService.users.create(dto);
    user.password = authService.hashPassword(dto.password);
    await dbService.users.save(user).catch((e) => {
      throw new HttpException(
        "It was not possible to register an account.",
        400
      );
    });
  }
}
