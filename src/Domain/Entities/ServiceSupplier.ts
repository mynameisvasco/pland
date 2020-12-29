import { Column, Entity, ManyToOne } from "typeorm";
import { WeekDays } from "../Enums/WeekDays";
import { Service } from "./Service";
import { User } from "./User";

@Entity()
export class ServiceSupplier extends User {
  @Column("datetime")
  startsAt: Date;

  @Column("datetime")
  endsAt: Date;

  @Column("varchar", {
    transformer: {
      from: (value: string) => value.split(","),
      to: (value: WeekDays[]) => value.join(","),
    },
  })
  availableDays: WeekDays[];

  @ManyToOne(() => Service)
  service: Service;
}
