import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeHelper {

    dtoToEntity(createEmployeeDto: CreateEmployeeDto) {
        const employee: Employee  = new Employee();
        //employee.id=createEmployeeDto.id;
        employee.fullName=createEmployeeDto.firstName+' '+createEmployeeDto.lastName;
        employee.position=createEmployeeDto.position;
        return employee;
        // return createEmployeeDto;
      }
    entityToDto(employee: Employee){
        const employeeDto: CreateEmployeeDto  = new CreateEmployeeDto();
        employeeDto.id=employee.id;
        employeeDto.firstName=employee.fullName.split(" ")[0];
        employeeDto.lastName=employee.fullName.split(" ")[1];
        employeeDto.position=employee.position;
        return employeeDto;
    }
}
