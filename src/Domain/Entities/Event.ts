import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  name: string;

  @Column("simple-array")
  tags: string[];

  @Column()
  limit: number;

  @Column("boolean")
  ticket: boolean;

  @Column("varchar")
  location: Place;

  @Column("varchar", { nullable: true })
  description: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  rating: number;
}
