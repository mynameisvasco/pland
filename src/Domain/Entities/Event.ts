import { Max, Min } from "class-validator";
import { addMinutes } from "date-fns";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Place } from "./Place";
import { Service } from "./Service";
import { User } from "./User";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  name: string;

  @Column("varchar", {
    nullable: true,
  })
  _tags?: string;

  @Column("int")
  attendanceLimit: number;

  @Column("tinyint")
  needsTicket: boolean;

  @Column("varchar", { nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column("datetime", {
    transformer: {
      from: (value: Date) => value,
      to: (value: string) => new Date(value),
    },
  })
  startsAt: Date;

  @Column("int")
  duration: number;

  @Column("float", { nullable: true })
  rating?: number;

  @Column("int", { nullable: true })
  raters?: number;

  @ManyToOne(() => User)
  planner: User;

  @ManyToMany(() => User, (u) => u.goingEvents, { cascade: true })
  @JoinTable()
  goers: User[];

  @ManyToMany(() => Service, (s) => s.servedEvents, { cascade: true })
  @JoinTable()
  services: Service[];

  @ManyToOne(() => Place)
  place: Place;

  get tags() {
    return this._tags.split(",");
  }

  get endsAt() {
    return addMinutes(new Date(this.startsAt), this.duration);
  }

  isFull() {
    return this.goers.length >= this.attendanceLimit;
  }
}
