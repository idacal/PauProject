import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCompetitorsCard } from './company-competitors-card';

describe('CompanyCompetitorsCard', () => {
  let component: CompanyCompetitorsCard;
  let fixture: ComponentFixture<CompanyCompetitorsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyCompetitorsCard]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyCompetitorsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 