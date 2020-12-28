import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Coordinates } from "./Coordinates";
import { Hour } from "./Hour";
import { WeekDays } from "./WeekDays";

export class Place {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    location: Coordinates;

    @Column()
    price: number;

    @Column()
    opensAt: Hour;

    @Column()
    closesAt: Hour;

    @Column("simple-array")
    availableDays: WeekDays[];
}