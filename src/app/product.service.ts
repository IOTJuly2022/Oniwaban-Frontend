import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL: string = "http://oniwabanspring9-env.eba-rx6f4mp2.us-west-2.elasticbeanstalk.com";

  private products!: Product[];

  constructor(private httpClient: HttpClient) {
    //this.products = [];

  }



  // Function that gets a list of products from the server
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseURL + "/listProducts").pipe(
      map(response => {
        this.products = response;
        return response;
      })
    );
  }
  getProductById(id:number):Product{
    return this.products[id];
  }


}
