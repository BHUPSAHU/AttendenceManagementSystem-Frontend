import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidBodyComponent } from './mid-body.component';

describe('MidBodyComponent', () => {
  let component: MidBodyComponent;
  let fixture: ComponentFixture<MidBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
