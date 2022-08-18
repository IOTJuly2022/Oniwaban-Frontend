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

  checkIfHome(): boolean {
    if (this.router.url == '/'){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response;
        let query = this.routes.snapshot.paramMap.get("query");
        if (query != null) {
          this.filterProducts(query);
        } else if (this.checkIfHome()) {
          this.filteredProducts = [this.products[0],this.products[1],this.products[2],this.products[3]];
        }

      }
    );
    
  }

}
