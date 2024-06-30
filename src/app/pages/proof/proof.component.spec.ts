import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofComponent } from './proof.component';

describe('ProofComponent', () => {
  let component: ProofComponent;
  let fixture: ComponentFixture<ProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProofComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
