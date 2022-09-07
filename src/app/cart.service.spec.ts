import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Product } from './product';

describe('CartService', () => {
  let service: CartService;
  let p = new Product(1,"bat","big bat","google.com",199);
  let p2 = new Product(2,"ball","baseball","google.com",199);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should add to cart', () => {
    service.addToCart(p);
    expect(service.cartList).toEqual([p]);
  });

  it('should list cart products', () => {
    let list = service.listCartProducts();
    expect(list).toEqual([]);
  });

  it('should emit update', () => {
    spyOn(service.update, 'emit');
    service.updater();
    expect(service.update.emit).toHaveBeenCalled();
  });

  it('should remove from cart', () => {
    service.addToCart(p);
    service.addToCart(p2);
    service.removeFromCart(p);
    expect(service.cartList).toEqual([p2]);
  });
});
