import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierProductsComponent } from './cashier-products.component';

describe('CashierProductsComponent', () => {
  let component: CashierProductsComponent;
  let fixture: ComponentFixture<CashierProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
