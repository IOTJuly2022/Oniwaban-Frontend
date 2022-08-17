import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() cartList!: Product[];
  @Input() totalCost: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.cartList = cartService.cartList;
    this.totalCost = this.calculate()/100;
   }

   calculate(): number {
     let cost = 0;
    for(let i =0; i < this.cartList.length; i++) {
      cost += this.cartList[i].priceInCents;
    }
    return cost;
   }

   ngOnChanges(): void {
     console.log("changed");
     this.cartList = this.cartService.cartList;
     this.router.navigateByUrl("/cart");
   }

  ngOnInit(): void {
  }

  

}
