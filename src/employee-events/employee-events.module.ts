import { Module } from '@nestjs/common';
import { EmployeeEventsProducer } from './employee-events-producer';

@Module({
  providers: [EmployeeEventsProducer]
})
export class EmployeeEventsModule {}
