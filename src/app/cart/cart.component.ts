import { Component, OnInit} from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: Product[] = [];
  totalCost: number = 0;

  constructor(private cartService: CartService) {
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

  ngOnInit(): void {
    this.updater();
  }

  updater() {
    this.cartService.update.subscribe((data:Product[]) => {
      this.cartList = data;
      this.totalCost = this.calculate()/100;
      }, (error) => {
      console.log('error');
      });
  }

}
