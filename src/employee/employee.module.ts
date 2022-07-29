import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeHelper } from './employee-helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeEventsModule } from 'src/employee-events/employee-events.module';
import { EmployeeEventsProducer } from 'src/employee-events/employee-events-producer';

@Module({
  imports:[
    EmployeeEventsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://eavqrnaz:Tg16FrPd19bnZL_3JghfKzD4f3h2ee4t@chunee.db.elephantsql.com/eavqrnaz',
      autoLoadEntities: true,
      synchronize:true
    }),
    TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeHelper,EmployeeEventsProducer]
})
export class EmployeeModule {}
