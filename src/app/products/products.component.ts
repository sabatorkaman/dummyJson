import { Component, inject, OnInit } from '@angular/core';
import { ProductApiService, ProductsDetail } from '../product-api.service';
import { MatButtonModule } from '@angular/material/button';
import { PostCardComponent } from "../post-card/post-card.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { forkJoin, switchMap } from 'rxjs';
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
  products?: ProductsDetail[]
  limit = 12
  category?: ""
  search = ""
  skip = -1
  sortData = ""
  isAssending = true
  price = ""
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.category = param["category"]
      this.isAssending = param["sort"]=== true


    })
    this.productApi.getProducts(this.limit, 0)
    .subscribe(items => {
      console.log(items.products)
      this.products = items.products
      this.SortClick()



    })


  }
  clickFilter() {
    this.productApi.filterProducts(this.search).subscribe((item) => {
      console.log(item)
      this.products = item.products
    })
  }
  moreProduct() {
    this.skip += 1
    this.productApi.getProducts(this.limit, this.skip).subscribe((item) => {
      if (this.products !== undefined) {
        if (item.products.length === 0) {
          console.log('No more products to load');
        } else {
          this.products = this.products.concat(item.products);
        }
      }
    });

  }
  SortClick() {
        this.isAssending=!this.isAssending

    // this.productApi.SortProducts(this.price).subscribe((item) => {

     
    //     console.log(item.length)
   
    // })

    // this.isAssending=!this.isAssending
    // if (this.isAssending === true) {
    //   alert("treue")
    // }

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



