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

  @Column("datetime", {
    transformer: {
      from: (value: Date) => value,
      to: (value: string) => new Date(value),
    },
  })
  opensAt: Date;

  @Column("datetime", {
    transformer: {
      from: (value: Date) => value,
      to: (value: string) => new Date(value),
    },
  })
  closesAt: Date;

  @Column("varchar", {
    transformer: {
      from: (value: string) => value.split(",").map((v) => parseInt(v)),
      to: (value: WeekDays[]) => value.join(","),
    },
  })
  availableDays: WeekDays[];

  @OneToMany(() => Event, (e) => e.place)
  events: Event[];
}
