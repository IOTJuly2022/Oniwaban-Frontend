import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
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

  public signUp(): void {
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch(() => {
      this.sendAlert("Invalid Email or password. Password requires 1 uppercase, 1 number and 1 special character.");
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signIn']);
    }).catch(() => {
      this.loading = false;
    });
  }

}