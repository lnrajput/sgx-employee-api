import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { EmployeeEventsModule } from './employee-events/employee-events.module';

@Module({
  imports: [EmployeeModule,
    ConfigModule.forRoot({isGlobal: true}),
    EmployeeEventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
