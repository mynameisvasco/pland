import * as Jwt from "jsonwebtoken";
import * as Crypto from "crypto";
import { AuthedUser } from "../../Domain/Models/AuthedUser";
import { Injectable, Config } from "kioto/build";

@Injectable()
export class JwtAuthService {
  constructor(private config: Config) {}

  createToken(authedUser: AuthedUser) {
    const jwtSecret = this.config.get<string>("jwt-secret");
    return Jwt.sign({ ...authedUser }, jwtSecret, {});
  }

  verifyTokenOrFail(accessToken: string) {
    const jwtSecret = this.config.get<string>("jwt-secret");
    return Jwt.verify(accessToken, jwtSecret) as AuthedUser;
  }

  hashPassword(password: string) {
    return Crypto.createHash("RSA-SHA512").update(password).digest("hex");
  }

  verifyPasswordOrFail(password: string, hash: string) {
    if (
      Crypto.createHash("RSA-SHA512").update(password).digest("hex") !== hash
    ) {
      throw new Error("Passwords do not match.");
    }
  }
}
