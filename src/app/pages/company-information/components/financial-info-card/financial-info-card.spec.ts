import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInfoCard } from './financial-info-card';

describe('FinancialInfoCard', () => {
  let component: FinancialInfoCard;
  let fixture: ComponentFixture<FinancialInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialInfoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialInfoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
