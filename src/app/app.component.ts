import { Component, ViewChild } from '@angular/core';
import { ProductService } from './product.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Oniwaban-Frontend';
  constructor() { }

  ngOnInit(): void {
  }

}
