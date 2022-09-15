import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ReviewComponent } from './review/review.component';

import { ProductViewComponent } from './product-view/product-view.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"products", component:ProductListComponent},
  {path:"products/:query", component:ProductListComponent},
  {path:"cart", component: CartComponent},
  {path:"about", component:AboutComponent},
  {path:"viewproduct/:id", component:ProductViewComponent},
  {path:"review/:id", component:ReviewComponent},
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
