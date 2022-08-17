import { Injectable ,EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Output() update = new EventEmitter<Product[]>();
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


  updater() {
    this.update.emit(this.cartList);
  }

  removeFromCart(p : Product) { 
    this.cartList = this.cartList.filter(prod => p.id != prod.id);
    this.updater();
  }
}
