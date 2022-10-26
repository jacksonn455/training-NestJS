import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // <-- This is the name of the table in the database
export class Coffee {
    @PrimaryGeneratedColumn() // <-- This is the primary key, auto-increment
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', {nullable: true}) // <-- This is the type array of the column
    flavors: string[];
}