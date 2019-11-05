/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerTaskCreateService } from './per-task-create.service';

describe('Service: PerTaskCreate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerTaskCreateService]
    });
  });

  it('should ...', inject([PerTaskCreateService], (service: PerTaskCreateService) => {
    expect(service).toBeTruthy();
  }));
});
