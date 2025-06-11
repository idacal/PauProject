import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketGraphsCard } from './market-graphs-card';

describe('MarketGraphsCard', () => {
  let component: MarketGraphsCard;
  let fixture: ComponentFixture<MarketGraphsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketGraphsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketGraphsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
