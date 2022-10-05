import { Test, TestingModule } from '@nestjs/testing';
import { TransactionAggregationService } from './transaction-aggregation.service';

describe('TransactionAggregationService', () => {
  let service: TransactionAggregationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionAggregationService],
    }).compile();

    service = module.get<TransactionAggregationService>(TransactionAggregationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
