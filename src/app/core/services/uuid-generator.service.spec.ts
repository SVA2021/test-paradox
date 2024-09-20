import { TestBed } from '@angular/core/testing';

import { UuidGeneratorService } from './uuid-generator.service';

describe('UuidGeneratorService', () => {
  let service: UuidGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UuidGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate uuid', () => {
    const uuid = service.getUUID();
    expect(uuid).toBeTruthy();
  });

  it('should generate different uuid', () => {
    const uuid1 = service.getUUID();
    const uuid2 = service.getUUID();
    expect(uuid1).not.toBe(uuid2);
  });
});
