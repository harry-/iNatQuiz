import { TestBed } from '@angular/core/testing';

import { InatApiService } from './inat-api.service';

describe('InatApiService', () => {
  let service: InatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
