import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsSideNavComponent } from './transactions-side-nav.component';

describe('TransactionsSideNavComponent', () => {
  let component: TransactionsSideNavComponent;
  let fixture: ComponentFixture<TransactionsSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
