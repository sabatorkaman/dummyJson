import { Component, inject, OnInit } from '@angular/core';
import { ProductApiService, ProductsDetail } from '../product-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productApi = inject(ProductApiService)
  products?: ProductsDetail[]
  limit = 2
  ngOnInit(): void {
    this.productApi.getProducts(this.limit, 0

    ).subscribe(items => {
      console.log(items.products)
      this.products = items.products

    })
  }

}
