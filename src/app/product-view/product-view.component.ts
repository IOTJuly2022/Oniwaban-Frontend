import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product!:Product;
  constructor(private productService:ProductService, private routes: ActivatedRoute,) {}

  ngOnInit(): void {
    let id = parseInt(this.routes.snapshot.paramMap.get("id")!);
    this.product = this.productService.getProductById(id);
  }

}
