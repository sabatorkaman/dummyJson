import { Component, inject, OnInit } from '@angular/core';
import { ProductApiService, ProductsDetail } from '../product-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PostCardComponent } from "../post-card/post-card.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PostCardComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productApi = inject(ProductApiService)
  private route = inject(ActivatedRoute)
  products?: ProductsDetail[]
  limit = 10
  category?: ""
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

}
