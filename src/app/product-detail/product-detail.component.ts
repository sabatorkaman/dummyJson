import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductApiService, ProductsDetail } from '../product-api.service';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CartHolderService } from '../cart-holder.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private productApi = inject(ProductApiService)
  private route = inject(ActivatedRoute)
  private cartHolder=inject(CartHolderService)
  id?: number
  product?:ProductsDetail
  count=computed(()=>this.cartHolder.allProducts().find((item)=> item.product.id === this.product?.id)?.count)
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.id = param["id"]
    })

    if (this.id !== undefined) {
      this.productApi.getProductDetail(this.id).subscribe((item)=>{
        this.product=item
      })

    }
  }
  addToCart(){
    if(this.product !== undefined){
      this.cartHolder.addProduct(this.product)

    }
  }
}
