import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit{
  cartProducts:any[]=[];
  subTotal:number=0;
  saleObject:any={
    SaleId: 0,
    CustId: 1,
    SaleDate: new Date(),
    TotalInvoiceAmount: 0,
    Discount: 0,
    PaymentNaration: "Visa",
    DeliveryAddress1: "No.10",
    DeliveryAddress2: "George Street",
    DeliveryCity: "Colombo",
    DeliveryPinCode: "80000",
    DeliveryLandMark: "Big Tree"
  };

  constructor(private productService:ProductService) {
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
      debugger;
    })
  }

  makeSale() {
    this.saleObject.TotalInvoiceAmount=this.subTotal;
    this.productService.makePurchase(this.saleObject).subscribe((res:any)=>{
      if(res.result){
        alert("Purchase Success!");
        this.productService.cartAddedSubject.next(true);
        this.loadCart();
      }
    })

  }

  RemoveItem(cartId: number) {
    this.productService.removeCartItemById(cartId).subscribe((res:any)=>{
      if(res.result){
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
}
