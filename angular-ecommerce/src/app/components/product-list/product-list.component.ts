import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  currentCategoryName!: string | null;
  products!: Product[];
  currentCategoryId!: number;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe( () => {
      this.listProducts();
    });

  }

  listProducts() {

    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId){
      // get the "id" param string , convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
     this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // not category id available .. default to category id 1
      this.currentCategoryId =1;
      this.currentCategoryName = 'Books';
    }
    // now get the products for this given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
