import { Component, inject, OnInit } from '@angular/core';
import { ProductApiService, ProductsDetail } from '../product-api.service';
import { MatButtonModule } from '@angular/material/button';
import { PostCardComponent } from "../post-card/post-card.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink, MatButtonModule, PostCardComponent, ProductCardComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productApi = inject(ProductApiService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  products: ProductsDetail[] = []
  serachModel: string | undefined
  limit = 30
  skip?: number
  /**search Queryparaam */
  search = ""
  totalElement = 0
  category = ""
  order: "asc" | "desc" = "asc"
  sortModel: "price" | "title" = "price"
  sort: "price" | "title" = "price"
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      if (this.search !== param['search'] || this.category != param["category"] ||
        this.sort !== param["sortBy"] || this.order !== param["order"]) {
        this.products = []
        this.skip = undefined
        this.serachModel = param["search"]
      }
      this.search = param["search"] ?? ""
      this.category = param["category"]
      this.sort = param["sortBy"]
      this.order = param['order']
      this.moreProduct()
    })
  }


  moreProduct() {

    if (this.skip !== undefined) {
      this.skip += this.limit
    }
    else {
      this.skip = 0
    }

    if (this.skip <= this.totalElement) {
      if (this.category !== undefined) {
        this.productApi.fliterByCategort(this.category).subscribe((item) => {
          console.log(item.products)
          this.products = this.products.concat(item.products)

        })
      }
      else if (this.search !== "") {
        this.productApi.getSearchProduct(this.search).subscribe((item) => {
          this.products = this.products.concat(item.products)
          this.totalElement = item.total
        })

      } else if (this.sort !== undefined) {
        this.productApi.filterBySort(this.sort, this.order ?? "asc").subscribe((item) => {
          this.products = this.products.concat(item.products)
          this.totalElement = item.total
        })
      } else {
        this.productApi.getAllProducts(this.limit, this.skip).subscribe((item) => {
          this.products = this.products.concat(item.products)
          this.totalElement = item.total

        })
      }
    }
  }





  filterClick() {
    this.router.navigate(['/products'], {
      queryParams: { search: this.serachModel, limit: this.limit, skip: this.skip }
    })
  }
  changeSortClick() {
    this.router.navigate(['/products'], {
      queryParams: { sortBy: this.sortModel, order: this.order }
    })

  }
  changeOrder() {
    //  console.log(this.order === "asc" ? "desc" : "asc")
    let nextOrder: "asc" | "desc" = (this.order === "asc" ? "desc" : "asc")
    console.log(nextOrder)
    this.router.navigate(["/products"], {
      queryParams: { sortBy: this.sortModel, order: nextOrder }
    })
  }
}
// let nextOrder: "asc" | "desc" = (this.order === "asc" ? "desc" : "asc")






