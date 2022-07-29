import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeHelper } from './employee-helper';

describe('EmployeeHelper', () => {
  let provider: EmployeeHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeHelper],
    }).compile();

    provider = module.get<EmployeeHelper>(EmployeeHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
