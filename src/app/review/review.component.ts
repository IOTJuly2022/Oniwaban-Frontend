import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  id = parseInt(this.routes.snapshot.paramMap.get("id")!);
  constructor(private routes: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.id);
  }

}
