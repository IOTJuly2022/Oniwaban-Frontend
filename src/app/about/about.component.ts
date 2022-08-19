import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  openDialog(): void{
    /*let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      height: '400px'
    })*/
    const contactInfo = document.getElementById("nandith-info");
    const contactButton = document.getElementById("nandith-button");
    if(contactInfo != null){
      contactInfo.style.display="block";
      if(contactButton !=null){
        contactButton.style.display="none";
      }
    }

  }


  ngOnInit(): void {
  }

}
