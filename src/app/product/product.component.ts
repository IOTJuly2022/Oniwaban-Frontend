import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() added: boolean = true;


  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.sendAlert("Added "+this.product.name+" to Cart");
    console.log(this.cartService.listCartProducts());
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product);
    this.sendAlert("Removed "+this.product.name+" from Cart");
    console.log(this.cartService.listCartProducts());
  }
  viewProduct(): void {
    this.router.navigate(['/viewproduct', this.product.id - 1]);
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
    }
  }

}
