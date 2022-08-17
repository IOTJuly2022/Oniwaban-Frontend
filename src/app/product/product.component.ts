import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() added: boolean = true;


  constructor(private cartService: CartService, private router:Router) { }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    alert("added to cart");
    console.log(this.cartService.listCartProducts());
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product);
    alert("removed from cart");
    console.log(this.cartService.listCartProducts());
  }
  viewProduct(): void {
    this.router.navigate(['/viewproduct', this.product.id]);
  }

}
