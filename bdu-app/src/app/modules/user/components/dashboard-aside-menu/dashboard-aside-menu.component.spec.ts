import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAsideMenuComponent } from './dashboard-aside-menu.component';

describe('DashboardAsideMenuComponent', () => {
  let component: DashboardAsideMenuComponent;
  let fixture: ComponentFixture<DashboardAsideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAsideMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
