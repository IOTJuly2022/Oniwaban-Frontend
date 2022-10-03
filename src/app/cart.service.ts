
import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable ,EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmSignUpOptions } from '@aws-amplify/auth/lib-esm/types';
import { map, Observable, of } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { cartItem } from './cart-item';
import { CognitoService } from './cognito.service';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseURL: string = "http://oniwabanspring9-env.eba-rx6f4mp2.us-west-2.elasticbeanstalk.com";
  

  @Output() update = new EventEmitter<Product[]>();
  cartList! : Product[];
  email:string = '';
  static id:number = 1;

  constructor(private httpClient: HttpClient, private cognitoService: CognitoService, private productService: ProductService) {
    this.cartList = [];
   }

   updateEmail(email: string) {
    this.email = email;
   }

  addToCart(p : Product){
    let signedIn:boolean = false;
    this.cognitoService.isAuthenticated().subscribe(
      (response) => {
        if(response) {
          console.log(this.email);
          signedIn = true;
        } else {
          signedIn = false;
        }
      }
    );
    if(signedIn) {
      this.addToCartDB(p);
    }
    this.cartList.push(p);
  }

  listCartProducts() : Product[] {
    return this.cartList;
  }


  updater() {
    this.update.emit(this.cartList);
  }

  removeFromCart(p : Product) { 
    let signedIn:boolean = false;
    this.cognitoService.isAuthenticated().subscribe(
      (response) => {
        if(response) {
          signedIn = true;
        } else {
          signedIn = false;
        }
      }
    );
    if(signedIn) {
      this.removeFromCartDB(p);
    }
    this.cartList = this.cartList.filter(prod => p.id != prod.id);
    this.updater();
  }

  getCart() {
    let toReturn:Product[] = [];
    let items:Product[] = [];
    let productId:Number[] = [];
    this.productService.getAllProducts().subscribe(result => {items = result;
    this.httpClient.get<Number[]>(this.baseURL + '/getCart/'+this.email)
         .subscribe(result => {productId = result;
    if(productId.length == 0) {
      this.cartList = [];
    } else {
      for(let i = 0; i < productId.length; i++) {
        let value = productId[i];
        for(let j = 0; j < items.length; j++) {
          if(items[j].id == value) {
            toReturn.push(items[j]);
          }
        }
      }
      this.cartList = toReturn;
    }})})
  }

  public addToCartDB(p: Product): void {
    let toAdd = new cartItem(CartService.id, this.email, p.id);
    CartService.id++;
    this.httpClient.post(this.baseURL+"/insertCart", toAdd).subscribe(result => console.log('added'));
  }

  public removeFromCartDB(p: Product) {
    this.httpClient.delete(this.baseURL + "/getCart/" + this.email + '/'+ p.id).subscribe(result => console.log('deleted'));
    
  }
}
