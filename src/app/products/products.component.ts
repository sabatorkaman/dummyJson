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
ngOnInit(): void {
  
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



