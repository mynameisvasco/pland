import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountStatus } from "../Enums/AccountStatus";
import { AccountTypes } from "../Enums/AccountTypes";
import { Event } from "./Event";
import { Ticket } from "./Ticket";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  name: string;

  @Column("int")
  age: number;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { nullable: true })
  phone: number;

  @Column("float", { default: 0 })
  rating: number;

  @Column("int")
  status: AccountStatus;

  @Column("int")
  type: AccountTypes;

  @OneToMany(() => Event, (e) => e.planner)
  plannedEvents: Event[];

  @ManyToMany(() => Event, (e) => e.goers)
  goingEvents: Event[];

  @ManyToMany(() => Ticket, (t) => t.users)
  tickets: Ticket[];
}
