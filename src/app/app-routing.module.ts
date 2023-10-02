import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CartComponent} from "./components/cart/cart.component";
import {SaleComponent} from "./components/sale/sale.component";

const routes: Routes = [
  {path:'**',component:HomeComponent},
  {path:'products', component:HomeComponent},
  {path:'cart', component:CartComponent},
  {path:'sale', component:SaleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
