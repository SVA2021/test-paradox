import { TestBed } from '@angular/core/testing';

import { RemindersApiService } from './reminders-api.service';

describe('RemindersApiService', () => {
  let service: RemindersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemindersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
