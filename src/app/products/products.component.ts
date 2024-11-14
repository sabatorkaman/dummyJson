import { Component, inject, OnInit } from '@angular/core';
import { ProductApiService, ProductsDetail } from '../product-api.service';
import { MatButtonModule } from '@angular/material/button';
import { PostCardComponent } from "../post-card/post-card.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, MatButtonModule, PostCardComponent, ProductCardComponent, MatFormFieldModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productApi = inject(ProductApiService)
  private route = inject(ActivatedRoute)
  products?: ProductsDetail[]
  limit = 3
  category?: ""
  search = ""
  skip = -1
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.category = param["category"]
    })
    this.productApi.getProducts(this.limit, 0
    ).subscribe(items => {
      console.log(items.products)
      this.products = items.products
    })
  }
  clickFilter() {
    this.productApi.filterProduct(this.search).subscribe((item) => {
      console.log(item)
      this.products = item.products
    })
  }
  moreProduct() {
    this.skip += 1
    this.productApi.getProducts(this.limit, this.skip).subscribe((product) => {
      console.log(product)
      this.products = product.products.concat(product.products)
      let me = this.products.concat(product.products)
      this.products = me
      console.log(me)
      // araye ghabli dor rikhte mishavad bayad handle shavad ba concat push or other meethod
    })

  }

}
