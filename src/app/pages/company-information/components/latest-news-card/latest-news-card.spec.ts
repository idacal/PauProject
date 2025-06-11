import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsCard } from './latest-news-card';

describe('LatestNewsCard', () => {
  let component: LatestNewsCard;
  let fixture: ComponentFixture<LatestNewsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestNewsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestNewsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
