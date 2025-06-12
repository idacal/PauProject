import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAssessment } from './load-assessment';

describe('LoadAssessment', () => {
  let component: LoadAssessment;
  let fixture: ComponentFixture<LoadAssessment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadAssessment]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadAssessment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 