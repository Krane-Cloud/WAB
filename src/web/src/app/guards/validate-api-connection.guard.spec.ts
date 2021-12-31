import { TestBed } from '@angular/core/testing';

import { ValidateApiConnectionGuard } from './validate-api-connection.guard';

describe('ValidateApiConnectionGuard', () => {
  let guard: ValidateApiConnectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateApiConnectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
