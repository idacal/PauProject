import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInfoCard } from './market-info-card';

describe('MarketInfoCard', () => {
  let component: MarketInfoCard;
  let fixture: ComponentFixture<MarketInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketInfoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketInfoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
