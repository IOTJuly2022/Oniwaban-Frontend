import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!:Product;
  @Input() added:boolean = true;
  

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    alert("added to cart");
    console.log(this.cartService.listCartProducts());
  }

}
