import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationService],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a valid CPF', () => {
    const isValid = service.validateCpf('123.456.789-09');
    expect(isValid).toBe(true);
  });

  it('should invalidate an invalid CPF', () => {
    const isValid = service.validateCpf('123.456.789-00');
    expect(isValid).toBe(false);
  });
});
