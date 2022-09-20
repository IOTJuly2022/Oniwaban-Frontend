import { HttpClient } from '@angular/common/http';
import { Injectable ,EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmSignUpOptions } from '@aws-amplify/auth/lib-esm/types';
import { map, Observable } from 'rxjs';
import { CartItem } from './cart-item';
import { CognitoService } from './cognito.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseURL: string = "http://oniwabanspring9-env.eba-rx6f4mp2.us-west-2.elasticbeanstalk.com";
  

  @Output() update = new EventEmitter<Product[]>();
  cartList! : Product[];
  email:string = '';

  constructor(private httpClient: HttpClient, private cognitoService: CognitoService) {
    this.cartList = [];
   }

  addToCart(p : Product){
    this.cognitoService.isAuthenticated().subscribe(
      (response) => {
        if(response) {
          this.addToCartDB(p);
        }
      }
    );
    this.cartList.push(p);
  }

  listCartProducts() : Product[] {
    return this.cartList;
  }


  updater() {
    this.update.emit(this.cartList);
  }

  removeFromCart(p : Product) { 
    this.cognitoService.isAuthenticated().subscribe(
      (response) => {
        if(response) {
          this.removeFromCartDB(p);
        }
      }
    );
    this.cartList = this.cartList.filter(prod => p.id != prod.id);
    this.updater();
  }

  public getCart(email: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseURL + "/getCart/" + email).pipe(
      map(response => {
        this.cartList = response;
        this.email = email;
        this.updater();
        return response;
      })
    );

  }

  public addToCartDB(p: Product): void {
    let toAdd = new CartItem(this.email, p);
    this.httpClient.post(this.baseURL+"/insertCart", toAdd);
  }

  public removeFromCartDB(p: Product) {
    this.httpClient.delete(this.baseURL + "/getCart/" + this.email + '/'+ p.id).pipe(
      map(response => {
        return;
      })
    );
    
  }
}
