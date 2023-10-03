import {Component, OnInit} from '@angular/core';
import {ProductService} from "./services/product.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {async} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  cartProducts:any[]=[];
  subTotal:number=0;
  constructor(
    private productService:ProductService,
    private router:Router,
    public authService:AuthenticationService
    ) {
    this.productService.cartAddedSubject.subscribe(res=>{
      this.loadCart();
    })
  }
  ngOnInit() {
    this.loadCart();
  }

  loadCart(){
    this.subTotal=0;
    this.productService.getCartItemsByCustomerId(1).subscribe((res:any)=>{
      this.cartProducts=res.data;
      this.cartProducts.forEach(element=>{
        this.subTotal+=element.productPrice;
      });
    })
  }
  clearCart(cart:any[]){
    for (let item of cart) {
      this.productService.removeCartItemById(item.cartId).subscribe((res:any)=>{
        if(res.result){
          this.loadCart();
          this.productService.cartAddedSubject.next(true);
        }
      })
    }
  }

  redirectToSale() {
    this.authService.currentUser$.subscribe((res)=>{
      if(res!=null){
        this.router.navigateByUrl('/sale');
      }else {
        alert("Please login to place the order!");
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.clearCart(this.cartProducts);
      this.router.navigate(['/']);
    });

  }
}
