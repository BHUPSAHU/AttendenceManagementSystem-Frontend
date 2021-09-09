import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectByIdComponent } from './subject-by-id.component';

describe('SubjectByIdComponent', () => {
  let component: SubjectByIdComponent;
  let fixture: ComponentFixture<SubjectByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
