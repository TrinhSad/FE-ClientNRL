import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernComponent } from './concern.component';

describe('ConcernComponent', () => {
  let component: ConcernComponent;
  let fixture: ComponentFixture<ConcernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcernComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
