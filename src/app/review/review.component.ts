import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Review } from '../review';

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

  constructor(private routes: ActivatedRoute, private productService: ProductService, private changeDetection: ChangeDetectorRef, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    console.log(this.id);
    this.productService.getProductById(this.id).then(p => { this.product = p; this.changeDetection.detectChanges(); });
  }

  submitReview() {
    console.log(this.rating);
    console.log(this.description);
    let r_id = this.randomInteger(5000, 6000);
    let p_id = this.product.id;
    let url = "http://oniwabanspring9-env.eba-rx6f4mp2.us-west-2.elasticbeanstalk.com";
    let r = new Review(r_id, parseInt(this.rating), p_id, this.description);
    this.http.post(url + "/insertReview", r).subscribe((response) => {
      console.log(response); 
      this.sendAlert("Successfully added Review for "+this.product.name);
      this.router.navigate([""]);
    });
    
  }
  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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


}
