import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoCard } from './company-info-card';

describe('CompanyInfoCard', () => {
  let component: CompanyInfoCard;
  let fixture: ComponentFixture<CompanyInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyInfoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInfoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
