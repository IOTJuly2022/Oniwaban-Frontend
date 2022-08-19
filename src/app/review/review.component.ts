import { HttpClient } from '@angular/common/http';
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
  product!: Product;
  rating: string = "5";
  description: string = "";

  constructor(private routes: ActivatedRoute, private productService: ProductService, private changeDetection: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.id);
    this.productService.getProductById(this.id).then(p => { this.product = p; this.changeDetection.detectChanges(); });
  }

  submitReview() {
    console.log(this.rating);
    console.log(this.description);
    let r_id = this.randomInteger(5000,6000);
    let p_id = this.product.id;
    //this.http.post()
  }
  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
