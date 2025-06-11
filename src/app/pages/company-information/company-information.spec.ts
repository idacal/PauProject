import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInformation } from './company-information';

describe('CompanyInformation', () => {
  let component: CompanyInformation;
  let fixture: ComponentFixture<CompanyInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
