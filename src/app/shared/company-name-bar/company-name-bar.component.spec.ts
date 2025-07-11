import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNameBarComponent } from './company-name-bar.component';

describe('CompanyNameBarComponent', () => {
  let component: CompanyNameBarComponent;
  let fixture: ComponentFixture<CompanyNameBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyNameBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyNameBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 