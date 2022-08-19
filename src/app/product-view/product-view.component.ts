import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
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
  product!: Product;
  reviews: Review[] = [];
  constructor(private productService: ProductService, private routes: ActivatedRoute, private reviewService: ReviewService, private changeDetection: ChangeDetectorRef, private cartService: CartService, private router: Router) {

  }

  ngOnInit(): void {
    let id = parseInt(this.routes.snapshot.paramMap.get("id")!);
    this.productService.getProductById(id).then(p => { this.product = p; this.changeDetection.detectChanges(); });
    this.reviewService.getReviewsById(id).subscribe((r) => {
      this.reviews = r.filter((x) => true);
      this.changeDetection.detectChanges();
      console.log(this.reviews);
    })
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.sendAlert("Added " + this.product.name + " to Cart");
  }

  sendAlert(msg: string): void {
    let notificationDiv = document.getElementById("notification");
    if (notificationDiv != null) {
      notificationDiv.innerHTML = "<h3>" + msg + "</h3>";
      notificationDiv.style.height = "3em";
      setTimeout(() => { this.retractAlert(); }, 5000);

    }
  }


  retractAlert(): void {
    let notificationDiv = document.getElementById("notification");
    if (notificationDiv != null) {
      notificationDiv.style.height = "0";
      //notificationDiv.innerText = "";
      setTimeout(() => { if (notificationDiv != null) { notificationDiv.innerText = "" } }, 100);
    }
  }

  addReview() {
    this.router.navigate(["/review", this.product.id]);
  }

}
