import { TestBed } from '@angular/core/testing';

import { HttpStudentClientService } from './http-student-client.service';

describe('HttpStudentClientService', () => {
  let service: HttpStudentClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpStudentClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
