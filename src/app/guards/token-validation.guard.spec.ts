import { TestBed } from '@angular/core/testing';

import { TokenValidationGuard } from './token-validation.guard';

describe('TokenValidationGuard', () => {
  let guard: TokenValidationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenValidationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
