import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryRestrictionsCard } from './industry-restrictions-card';

describe('IndustryRestrictionsCard', () => {
  let component: IndustryRestrictionsCard;
  let fixture: ComponentFixture<IndustryRestrictionsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryRestrictionsCard ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryRestrictionsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 