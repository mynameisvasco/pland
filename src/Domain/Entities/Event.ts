import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  description: string;
}
