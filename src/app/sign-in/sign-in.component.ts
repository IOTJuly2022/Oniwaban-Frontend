import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CartService } from '../cart.service';

import { IUser, CognitoService } from '../cognito.service';
import { Product } from '../product';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  loading: boolean;
  user: IUser;

  constructor(private router: Router,
              private cognitoService: CognitoService, private httpClient: HttpClient, private cartService: CartService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  sendAlert(msg: string): void {
    let notificationDiv = document.getElementById("notification");
    if (notificationDiv != null) {
      notificationDiv.innerHTML = "<h3>"+msg+"</h3>";
      notificationDiv.style.height = "3em";
      setTimeout(()=>{this.retractAlert();}, 5000);
      
    }
  }
  

  retractAlert():void{
    let notificationDiv = document.getElementById("notification");
    if (notificationDiv != null) {
      notificationDiv.style.height = "0";
      //notificationDiv.innerText = "";
      setTimeout(()=>{if(notificationDiv != null){notificationDiv.innerText=""}}, 100);
    }
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
      this.cartService.getCart();
      this.router.navigate(['/profile']);
    }).catch(() => {
      this.sendAlert("Incorrect Username or Password, please try again");
      this.loading = false;
    });
  }

}