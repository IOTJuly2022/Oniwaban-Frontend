
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
  email:string = 'ken';
  static id:number = 1;

  constructor(private httpClient: HttpClient, private cognitoService: CognitoService, private productService: ProductService) {
    this.cartList = [];
   }

  addToCart(p : Product){
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

  getCart() {
    let toReturn:Product[] = [];
    let items:Product[] = [];
    let productId:Number[] = [];
    this.productService.getAllProducts().subscribe(result => {items = result;
    this.httpClient.get<Number[]>(this.baseURL + '/getCart/ken')
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
    console.log('yrrd');
    this.httpClient.post(this.baseURL+"/insertCart", toAdd).subscribe(result => console.log('added'));
  }

  public removeFromCartDB(p: Product) {
    this.httpClient.delete(this.baseURL + "/getCart/" + this.email + '/'+ p.id).pipe(
      map(response => {
        return;
      })
    );
    
  }
}
