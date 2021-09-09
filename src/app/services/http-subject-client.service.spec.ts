import { TestBed } from '@angular/core/testing';

import { HttpSubjectClientService } from './http-subject-client.service';

describe('HttpSubjectClientService', () => {
  let service: HttpSubjectClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSubjectClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
