import { TestBed } from '@angular/core/testing';

import { TransactionsFormStateService } from './transactions-form-state.service';

describe('TransactionsFormStateService', () => {
  let service: TransactionsFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
