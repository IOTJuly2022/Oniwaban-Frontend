import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  removeFromCart(p : Product) { 
    this.cartList = this.cartList.filter(prod => p.id != prod.id);
  }
}
