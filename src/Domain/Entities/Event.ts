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
    transformer: {
      from: (value: string) => value?.split(","),
      to: (value: string[]) => value?.join(","),
    },
    nullable: true,
  })
  tags?: string[];

  @Column("int")
  attendanceLimit: number;

  @Column("tinyint")
  needsTicket: boolean;

  @Column("varchar", { nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column("datetime")
  happensAt: Date;

  @Column("float", { nullable: true })
  rating: number;

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
}
