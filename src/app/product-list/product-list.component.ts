import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  filteredProducts: Product[] = [];
  searchQuery:string = "";
  constructor(private productService: ProductService, private routes: ActivatedRoute, private router:Router) {

  }

  search(){
    console.log(this.searchQuery);
    this.filterProducts(this.searchQuery);
    this.router.navigate(['/products', this.searchQuery]);
  }

  filterProducts(query:string): void {
    this.filteredProducts = this.products.filter(x => x.name.toLowerCase().includes(query.toLowerCase()));
    
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response;
        let query = this.routes.snapshot.paramMap.get("query");
        if (query != null) {
          this.filterProducts(query);
        }

      }
    );
    
  }

}
