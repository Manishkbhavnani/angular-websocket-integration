import { TestBed } from '@angular/core/testing';

import { DashboaredService } from './dashboared.service';

describe('DashboaredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboaredService = TestBed.get(DashboaredService);
    expect(service).toBeTruthy();
  });
});
