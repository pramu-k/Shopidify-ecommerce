import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  productList:any[]=[];
  constructor(private productServie:ProductService) {
  }
  ngOnInit() {
    debugger;
    this.loadAllProducts()
  }

  loadAllProducts(){
    debugger;
    this.productServie.getAllProducts().subscribe((result:any)=>{
      this.productList = result.data; //we decide what to fetch by looking at what the api call returns us.
      //here the result is an object, and there's an attribute called data inside that object.
      //That attribute contains the list of products.
    })
  }

}
