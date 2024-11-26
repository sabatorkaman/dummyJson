import { Component, inject, OnInit } from '@angular/core';
import { CartHolderService } from '../cart-holder.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HighlightSearchPipe } from "../hilight-search.pipe";
import { MatChip, MatChipSet } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { RatingComponent } from "../rating/rating.component";
import { ProductsDetail } from '../product-api.service';
@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipSet, HighlightSearchPipe, MatChip, RouterLink, CurrencyPipe, RatingComponent],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent implements OnInit {
  public cartHolder = inject(CartHolderService)
  searchText: string | undefined;
  ngOnInit(): void {

  }
  plusProduct(product: ProductsDetail) {

  }
  minesProduct(product: ProductsDetail) {

  }
}
