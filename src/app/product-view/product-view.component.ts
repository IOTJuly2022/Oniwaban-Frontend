import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product!:Product;
  reviews:Review[] = [];
  constructor(private productService:ProductService, private routes: ActivatedRoute, private reviewService:ReviewService, private changeDetection: ChangeDetectorRef) {
  
  }

  ngOnInit(): void {
    let id = parseInt(this.routes.snapshot.paramMap.get("id")!);
    this.productService.getProductById(id).then(p=>{this.product = p;this.changeDetection.detectChanges();});
    this.reviewService.getReviewsById(id).subscribe((r)=>{
      this.reviews = r.filter((x)=>true);
      this.changeDetection.detectChanges();
      console.log(this.reviews);
    })
  }

}
