import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ReviewComponent } from './review/review.component';

import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"products", component:ProductListComponent},
  {path:"products/:query", component:ProductListComponent},
  {path:"cart", component: CartComponent},
  {path:"about", component:AboutComponent},
  {path:"review", component:ReviewComponent},
  {path:"viewproduct/:id", component:ProductViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }