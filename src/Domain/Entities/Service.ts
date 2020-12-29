import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./Event";
import { ServiceSupplier } from "./ServiceSupplier";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  name: string;

  @Column("float")
  price: number;

  @ManyToMany(() => Event, (e) => e.services)
  servedEvents: Event[];

  @OneToMany(() => ServiceSupplier, (ss) => ss.service)
  suppliers: ServiceSupplier[];
}
