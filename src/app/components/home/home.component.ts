import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  productList:any[]=[];
  cartObject:any={
    CartId: 0,
    CustId: 1,
    ProductId: 0,
    Quantity: 0,
    AddedDate: "2023-10-02T12:07:31.452Z"
  }
  constructor(private productService:ProductService) {
  }
  ngOnInit() {
    debugger;
    this.loadAllProducts()
  }

  loadAllProducts(){
    debugger;
    this.productService.getAllProducts().subscribe((result:any)=>{
      this.productList = result.data; //we decide what to fetch by looking at what the api call returns us.
      //here the result is an object, and there's an attribute called data inside that object.
      //That attribute contains the list of products.
    })
  }
  addItemToCart(productId:number){
    debugger;
    this.cartObject.ProductId=productId;
    this.productService.addToCart(this.cartObject).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert("Product added to the cart successfully!");
        this.productService.cartAddedSubject.next(true);
      }
  });
  }


}
