import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../product';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate cost', () => {
     let test = new Product(1, 'bat', 'baseball bat', 'image', 110);
     let test2 = new Product(2, 'ball', 'baseball', 'image', 250);
     component.cartList.push(test);
     component.cartList.push(test2);
     expect(component.calculate()).toEqual(360);
  });

  it('should display alert after checkout', () => {
    spyOn(component, "sendAlert");
    let checkOutButton = fixture.nativeElement.querySelector('[id="checkout"]');
    checkOutButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.sendAlert).toHaveBeenCalledTimes(1);
  });
});
