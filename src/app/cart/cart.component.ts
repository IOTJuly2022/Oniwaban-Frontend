import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList!: Product[];
  totalCost: number = 0;

  constructor(private cartService: CartService) {
    this.cartList = cartService.cartList;
    //this.number = this.calculate();
   }

  ngOnInit(): void {
  }

  

}
