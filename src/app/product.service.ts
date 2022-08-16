import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL: string = "http://oniwabanspring9-env.eba-rx6f4mp2.us-west-2.elasticbeanstalk.com";
  constructor(private httpClient: HttpClient) {
    this.getAllProducts().subscribe(x => {
      console.log(x);

    });

  }

  getAllProducts():Observable<JSON> {
    return this.httpClient.get<JSON>(this.baseURL + "/listProducts").pipe(
      map(response => {
        return response;
      })
    );
    
  }

}
