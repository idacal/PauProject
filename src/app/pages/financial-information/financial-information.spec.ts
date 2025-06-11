import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInformation } from './financial-information';

describe('FinancialInformation', () => {
  let component: FinancialInformation;
  let fixture: ComponentFixture<FinancialInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
