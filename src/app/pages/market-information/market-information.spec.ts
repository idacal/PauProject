import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInformation } from './market-information';

describe('MarketInformation', () => {
  let component: MarketInformation;
  let fixture: ComponentFixture<MarketInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
