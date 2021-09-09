import { TestBed } from '@angular/core/testing';

import { HttpCourseClientService } from './http-course-client.service';

describe('HttpCourseClient.ServiceService', () => {
  let service: HttpCourseClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCourseClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
