import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { nullable: true })
  phone: string;

  @Column("float", { default: 0 })
  rating: number;

  @Column("int", { default: AccountStatus.ACTIVE })
  status: AccountStatus;

  @Column("int", { default: AccountTypes.CLIENT })
  type: AccountTypes;

  @CreateDateColumn({ type: "datetime", nullable: true })
  createdAt: Date;

  @OneToMany(() => Event, (e) => e.planner)
  plannedEvents: Event[];

  @ManyToMany(() => Event, (e) => e.goers)
  goingEvents: Event[];

  @ManyToMany(() => Ticket, (t) => t.users)
  tickets: Ticket[];
}
