import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  id = parseInt(this.routes.snapshot.paramMap.get("id")!);
  product!:Product;
  constructor(private routes: ActivatedRoute, private productService:ProductService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.id);
    this.productService.getProductById(this.id).then(p=>{this.product = p;this.changeDetection.detectChanges();});
  }

}
