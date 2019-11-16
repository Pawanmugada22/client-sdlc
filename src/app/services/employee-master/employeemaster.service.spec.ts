/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeemasterService } from './employeemaster.service';

describe('Service: Employeemaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeemasterService]
    });
  });

  it('should ...', inject([EmployeemasterService], (service: EmployeemasterService) => {
    expect(service).toBeTruthy();
  }));
});
