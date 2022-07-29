import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { EmployeeEventsProducer } from 'src/employee-events/employee-events-producer';
import { EmployeeEventsModule } from 'src/employee-events/employee-events.module';
import { Repository, UpdateResult, Equal, ILike } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeHelper } from './employee-helper';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(
    private readonly employeeEventsProducer: EmployeeEventsProducer,
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    private readonly employeeHelper: EmployeeHelper) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return from(this.employeeRepository.save(this.employeeHelper.dtoToEntity(createEmployeeDto))).pipe(
      map((employee: Employee)=>{
        
        this.employeeEventsProducer.produce({
          topic: 'emp2req',
          messages:[{value: JSON.stringify(employee)}]
        });
        return this.employeeHelper.entityToDto(employee);
    }))
  }

  findAll() {
    return from(this.employeeRepository.find()).pipe(
      map((employees: Employee[])=>{
        return employees.map((employee: Employee)=>{
          return this.employeeHelper.entityToDto(employee);
        })
      })
      )
    //return `This action returns all employee`;
  }

  findOne(id: number) {
    return from(this.employeeRepository.findOne({where: [
      {id: id}
    ]})).pipe(
      map((employee: Employee)=>{
        return this.employeeHelper.entityToDto(employee);
      })
    );

    //return `This action returns a #${id} employee`;
  }
  /* runtime error */
  findAllByName(fullName: string) {
    return from(this.employeeRepository.findBy({fullName: ILike('%'+fullName+'%')})).pipe(
      map((employees: Employee[])=>{
        return employees.map((employee: Employee)=>{
          return this.employeeHelper.entityToDto(employee);
        })
      })
    );
  }
  

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    //return this.findOne(id);
    return from(this.employeeRepository.update(id,this.employeeHelper.dtoToEntity(<CreateEmployeeDto>updateEmployeeDto))).pipe(
       switchMap(()=>{
         return this.findOne(id);
       })
    );
    //return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return from(this.employeeRepository.delete(id));
    //return `This action removes a #${id} employee`;
  }
}
