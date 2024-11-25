import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductsDetail } from '../product-api.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { CartHolderService } from '../cart-holder.service';
import { NgOptimizedImage } from '@angular/common'
import { RatingComponent } from "../rating/rating.component";
import { HighlightSearchPipe } from "../hilight-search.pipe";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CurrencyPipe, MatChipsModule, RouterLink, JsonPipe, RatingComponent,HighlightSearchPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'

})
export class ProductCardComponent implements OnInit {
  @Input() product?: ProductsDetail
  @Input() searchText: string = ""
  indexImage = 0
  ngOnInit(): void {

  }
  prveImage() {
    if (this.indexImage > 0) {
      this.indexImage--
    }

  }
  nextImage() {
    if (this.product !== undefined) {
      if (this.indexImage + 1 < this.product.images.length) {
        this.indexImage++
      }
    }
  }


}
