import { Component, OnInit} from '@angular/core';
import { CartService } from '../cart.service';
import { CognitoService } from '../cognito.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: Product[] = [];
  totalCost: number = 0;
  numItems!: number;

  constructor(private cartService: CartService, private cognitoService: CognitoService) {
    this.cartList = cartService.cartList;
    this.numItems = this.cartList.length
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

  checkOut() : void {
    this.sendAlert("This demo doesn't support payment processing");
  }

  sendAlert(msg: string): void {
    let notificationDiv = document.getElementById("notification");
    if (notificationDiv != null) {
      notificationDiv.innerHTML = "<h3>"+msg+"</h3>";
      notificationDiv.style.height = "3em";
      setTimeout(()=>{this.retractAlert();}, 5000);
    }
  }

  retractAlert():void{
    let notificationDiv = document.getElementById("notification");
    if (notificationDiv != null) {
      notificationDiv.style.height = "0";
      //notificationDiv.innerText = "";
      setTimeout(()=>{if(notificationDiv != null){notificationDiv.innerText=""}}, 100);
    }
  }

  updater() {
    this.cartService.update.subscribe((data:Product[]) => {
      this.cartList = data;
      this.totalCost = (this.calculate()/100);
      this.numItems =0 +  this.cartList.length;
      });
  }

}
