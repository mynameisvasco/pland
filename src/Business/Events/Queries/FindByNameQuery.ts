import { MinLength } from "class-validator";

export class FindByNameQuery {
  @MinLength(3)
  name: string;
}
