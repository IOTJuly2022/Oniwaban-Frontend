import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseURL: string = "http://oniwabanspring9-env.eba-rx6f4mp2.us-west-2.elasticbeanstalk.com";

  private reviews!: Review[];

  constructor(private httpClient: HttpClient) {

  }

  getAllReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.baseURL + "/listAllReviews").pipe(
      map(response => {
        this.reviews = response;
        return response;
      })
    );
  }
  getReviewsById(id:number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.baseURL + "/getReviews/"+id).pipe(
      map(response => {
        return response;
      })
    );
  }


}
