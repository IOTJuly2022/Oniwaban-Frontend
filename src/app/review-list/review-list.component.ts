import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews!: Review[];
  sortedById!: Review[];

  constructor(private reviewService: ReviewService) { }

    sortById(id: number): Review[] {
      return(this.reviews.filter(x => x.id == id));
  }

  ngOnInit(): void {
    this.reviewService.getAllReviews().subscribe(
      (response) => {
        this.reviews = response;
      }
    );
  }

}
