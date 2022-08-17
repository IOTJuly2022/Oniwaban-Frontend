import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!:Product[];
  filteredProducts:Product[] = [];

  constructor(private productService:ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response)=>{
        this.products = response;
        this.filteredProducts = response;
      }
    );
  }

}
