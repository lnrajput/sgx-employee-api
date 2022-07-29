import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column() 
    fullName: string;

    @Column() 
    position: number;

    /*
    constructor(employee? : Partial<Employee>){
        Object.assign(this,employee);
    }
    */
}
