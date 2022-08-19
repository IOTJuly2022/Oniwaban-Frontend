import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  openDialogNandith(): void{
  
    const contactInfo = document.getElementById("nandith-info");
    const contactButton = document.getElementById("nandith-button");
    if(contactInfo != null){
      contactInfo.style.display="block";
      if(contactButton !=null){
        contactButton.style.display="none";
      }
    }
  }

  openDialogEli(): void{  
    const contactInfoEli = document.getElementById("eli-info");
    const contactButtonEli = document.getElementById("eli-button");
    if(contactInfoEli != null){
      contactInfoEli.style.display="block";
      if(contactButtonEli !=null){
        contactButtonEli.style.display="none";
      }
    }
    }


  openDialogKen(): void{  
    const contactInfoKen = document.getElementById("ken-info");
    const contactButtonKen = document.getElementById("ken-button");
    if(contactInfoKen != null){
      contactInfoKen.style.display="block";
      if(contactButtonKen !=null){
        contactButtonKen.style.display="none";
      }
    }
    }


  openDialogTrent(): void{  
    const contactInfoTrent = document.getElementById("trent-info");
    const contactButtonTrent = document.getElementById("trent-button");
    if(contactInfoTrent != null){
      contactInfoTrent.style.display="block";
      if(contactButtonTrent !=null){
        contactButtonTrent.style.display="none";
      }
    }
    }


  ngOnInit(): void {
  }

}

