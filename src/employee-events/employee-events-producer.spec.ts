import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEventsProducer } from './employee-events-producer';

describe('EmployeeEventsProducer', () => {
  let provider: EmployeeEventsProducer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeEventsProducer],
    }).compile();

    provider = module.get<EmployeeEventsProducer>(EmployeeEventsProducer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
