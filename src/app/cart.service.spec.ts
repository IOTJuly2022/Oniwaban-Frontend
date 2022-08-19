import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Product } from './product';

describe('CartService', () => {
  let service: CartService;
  let p = new Product(1,"bat","big bat","google.com",199);

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
  })
});
