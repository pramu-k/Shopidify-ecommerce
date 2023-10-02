import {Component, OnInit} from '@angular/core';
import {ProductService} from "./services/product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  cartProducts:any[]=[];
  subTotal:number=0;
  constructor(private productService:ProductService) {
    this.productService.cartAddedSubject.subscribe(res=>{
      debugger;
      this.loadCart();
    })
  }
  ngOnInit() {
    this.loadCart();
  }

  loadCart(){
    this.productService.getCartItemsByCustomerId(1).subscribe((res:any)=>{
      this.cartProducts=res.data;
      this.cartProducts.forEach(element=>{
        this.subTotal+=element.productPrice;
      });
      debugger;
    })
  }

  redirectToSale() {
  }
}
