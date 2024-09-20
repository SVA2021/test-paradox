import { TestBed } from '@angular/core/testing';

import { NoticesApiService } from './notices-api.service';

describe('NoticesApiService', () => {
  let service: NoticesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
