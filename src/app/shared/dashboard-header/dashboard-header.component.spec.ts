import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardHeaderComponent } from './dashboard-header.component';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DashboardHeaderComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to landing page when search is clicked on company page', () => {
    component.config = { pageType: 'company', title: 'Test Title' };
    component.onSearchClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/landing']);
  });

  it('should navigate to load assessment when menu is clicked on company page', () => {
    component.config = { pageType: 'company', title: 'Test Title' };
    component.onMenuClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/load-assessment']);
  });

  it('should emit events when buttons are clicked', () => {
    spyOn(component.uploadClick, 'emit');
    spyOn(component.searchClick, 'emit');
    spyOn(component.menuClick, 'emit');

    component.onUploadClick();
    component.onSearchClick();
    component.onMenuClick();

    expect(component.uploadClick.emit).toHaveBeenCalled();
    expect(component.searchClick.emit).toHaveBeenCalled();
    expect(component.menuClick.emit).toHaveBeenCalled();
  });
}); 