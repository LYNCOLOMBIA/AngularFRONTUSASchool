import { TestBed } from '@angular/core/testing';

import { RoleAdminValidationGuard } from './role-admin-validation.guard';

describe('RoleAdminValidationGuard', () => {
  let guard: RoleAdminValidationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleAdminValidationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
