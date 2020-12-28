import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column("varchar")
    name: string;

    @Column()
    price: number;
}