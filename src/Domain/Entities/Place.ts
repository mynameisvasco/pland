import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coordinates } from "../Models/Coordinates";
import { WeekDays } from "../Enums/WeekDays";
import { Event } from "./Event";

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  name: string;

  @Column("varchar", {
    transformer: {
      from: (value: string) => {
        const arr = value.split(",");
        return new Coordinates(parseFloat(arr[0]), parseFloat(arr[1]));
      },
      to: (value: Coordinates) => `${value.latitude},${value.longitude}`,
    },
  })
  location: Coordinates;

  @Column("int")
  price: number;

  @Column("datetime")
  opensAt: Date;

  @Column("datetime")
  closesAt: Date;

  @Column("varchar", {
    transformer: {
      from: (value: string) => value.split(","),
      to: (value: WeekDays[]) => value.join(","),
    },
  })
  availableDays: WeekDays[];

  @OneToMany(() => Event, (e) => e.place)
  events: Event[];
}
