import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("float")
  price: number;

  @ManyToMany(() => User, (u) => u.tickets, { cascade: true })
  @JoinTable()
  users: User[];
}
