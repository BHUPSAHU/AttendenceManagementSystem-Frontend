import { TestBed } from '@angular/core/testing';

import { HttpAttendanceClientService } from './http-attendance-client.service';

describe('HttpAttendanceClientService', () => {
  let service: HttpAttendanceClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAttendanceClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
