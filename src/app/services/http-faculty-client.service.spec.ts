import { TestBed } from '@angular/core/testing';

import { HttpFacultyClientService } from './http-faculty-client.service';

describe('HttpFacultyClientService', () => {
  let service: HttpFacultyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFacultyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
