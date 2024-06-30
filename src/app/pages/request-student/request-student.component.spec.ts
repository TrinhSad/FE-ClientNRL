import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStudentComponent } from './request-student.component';

describe('RequestStudentComponent', () => {
  let component: RequestStudentComponent;
  let fixture: ComponentFixture<RequestStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
