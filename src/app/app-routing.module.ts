import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CartComponent} from "./components/cart/cart.component";
import {SaleComponent} from "./components/sale/sale.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products', component:HomeComponent},
  {path:'cart', component:CartComponent},
  {path:'sale', component:SaleComponent},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
