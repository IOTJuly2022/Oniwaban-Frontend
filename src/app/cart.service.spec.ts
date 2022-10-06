import { HttpClient, HttpClientModule, HttpContext } from '@angular/common/http';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CartService } from './cart.service';
import { CognitoService } from './cognito.service';
import { Product } from './product';

describe('CartService', () => {
  let service: CartService;
  let p = new Product(1,"bat","big bat","google.com",199);
  let p2 = new Product(2,"ball","baseball","google.com",199);
  let mockHttp = {post: jasmine.createSpy('post').and.returnValue(of('true')),
                  delete: jasmine.createSpy('delete').and.returnValue(of('true')),};
  let mockCognito = {isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(of('true'))};
    

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[{provide: HttpClient, useValue: mockHttp }, {provide:CognitoService, useValue:mockCognito}]});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should add to cart', () => {
    service.addToCart(p);
    expect(service.cartList).toEqual([p]);
  });

  it('should add to cart with sign in', () => {
    spyOn(service, 'addToCartDB');
    service.addToCart(p);
    expect(service.addToCartDB).toHaveBeenCalledTimes(1);
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

  it('should add to cartDB', () => {
    service.addToCartDB(p);
    expect(mockHttp.post).toHaveBeenCalled();
  })

  it('should remove from cartDB', () => {
    service.removeFromCartDB(p);
    expect(mockHttp.delete).toHaveBeenCalled();
  })
});
