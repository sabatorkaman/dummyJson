import { Component, inject, OnInit } from '@angular/core';
import { ProductApiService, ProductsDetail } from '../product-api.service';
import { MatButtonModule } from '@angular/material/button';
import { PostCardComponent } from "../post-card/post-card.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink, MatButtonModule, PostCardComponent, ProductCardComponent, MatFormFieldModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productApi = inject(ProductApiService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  products: ProductsDetail[] = []
  limit = 2
  // category?: ""
  search = ""
  skip?: number
  price?: number | undefined
  sortBy?: "price" | "title" = "price"
  order?: "asc" | "desc"
  totalElement = 0
  category?: string
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      if (this.order !== param["order"] || this.sortBy !== param["sort"] || this.search !== param["search"] || this.category !== param["category"]) {
        this.skip = undefined
        this.products = []
      }
      this.order = param["order"]
      this.sortBy = param["sort"]
      this.search = param["search"] ?? ""
      this.category = param["category"]
      this.moreProduct()
    })

  }

  moreProduct() {

    if (this.skip !== undefined) {
      this.skip += this.limit
    } else {
      this.skip = 0
    }
    if (this.skip <= this.totalElement) {

      if (this.category !== undefined) {
        this.productApi.getProductByCategory(this.category, this.limit, this.skip).subscribe((item) => {
          this.products = this.products.concat(item.products)
          this.totalElement = item.total
          console.log(this.category)
        })
      }
      else if (this.search === "") {
        this.productApi.getProducts(this.limit, this.skip, this.sortBy, this.order).subscribe((item) => {
          this.products = this.products.concat(item.products);
          this.totalElement = item.total
        });
      }
      else {
        this.productApi.filterProducts(this.search, this.limit, this.skip).subscribe((item) => {
          this.products = this.products.concat(item.products)
          this.totalElement = item.total
        })
      }
    }
  }

  orderClick() {
    console.log("hi")
    let nextOrder: 'asc' | 'desc' = (this.order === "asc" ? "desc" : "asc")
    this.router.navigate(["/products"], {
      // replaceUrl: true, #Not push url change in history
      queryParams: { category: this.category, order: nextOrder, sort: this.sortBy, search: this.search },
    })
    this.order = nextOrder
  }

  changeQueryParam() {
    this.router.navigate(["/products"], {
      // replaceUrl: true, #Not push url change in history
      queryParams: { category: this.category, order: this.order, sort: this.sortBy, search: this.search },
    })
  }
}

























// this.productApi.SortProducts().subscribe((item) => {
//   console.log(item)
//   console.log(this.sortData)

// })
// this.sortProductsDesc()
//   if (this.products !== undefined) {
//     this.products = this.products.sort((a, b) => b.price - a.price);

//   }
// }


// sortProductsDesc(): void {
//   if (this.products !== undefined) {
//     this.products = this.products.sort((a, b) => a.price - b.price);
//   }
// }



