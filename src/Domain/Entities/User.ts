import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccountStatus } from "./AccountStatus";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column("varchar")
    name: string;

    @Column()
    age: number;

    @Column("varchar")
    @IsEmail()
    email: string;

    @Column("varchar")
    password: string;

    @Column("varchar", {nullable: true})
    phone: number;

    @Column()
    rating: number;

    @Column()
    status: AccountStatus;
}