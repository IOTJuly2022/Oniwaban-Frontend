import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  nandithDisplay:boolean = false;
  nandithButton:boolean = true;
  eliDisplay:boolean = false;
  eliButton:boolean = true;
  kenDisplay:boolean = false;
  kenButton:boolean = true;
  trentDisplay:boolean = false;
  trentButton:boolean = true;

  constructor() { }

  openDialogNandith(): void{
    this.nandithDisplay = true;
    this.nandithButton = false;
  }

  openDialogEli(): void{
    this.eliDisplay = true;
    this.eliButton = false;  
  }


  openDialogKen(): void{  
    this.kenDisplay = true;
    this.kenButton = false;
  }


  openDialogTrent(): void{  
    this.trentDisplay = true;
    this.trentButton = false;
  }


  ngOnInit(): void {
  }

}

