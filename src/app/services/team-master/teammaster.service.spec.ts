/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeammasterService } from './teammaster.service';

describe('Service: Teammaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeammasterService]
    });
  });

  it('should ...', inject([TeammasterService], (service: TeammasterService) => {
    expect(service).toBeTruthy();
  }));
});
