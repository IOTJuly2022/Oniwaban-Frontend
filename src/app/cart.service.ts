import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList! : Product[];

  constructor() {
    this.cartList = [];
   }

  addToCart(p : Product){
    this.cartList.push(p);
  }

  listCartProducts() : Product[] {
    return this.cartList;
  }
}
