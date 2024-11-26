import { Component, computed, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductsDetail } from '../product-api.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartHolderService } from '../cart-holder.service';
import { RatingComponent } from "../rating/rating.component";
import { HighlightSearchPipe } from "../hilight-search.pipe";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CurrencyPipe, MatChipsModule, RouterLink, RatingComponent, HighlightSearchPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'

})
export class ProductCardComponent implements OnInit {
  public cartHolder = inject(CartHolderService)
  private route = inject(ActivatedRoute)
  @Input() product?: ProductsDetail
  @Input() searchText?: string = ""

  count = computed(() => this.cartHolder.allProducts().find((item) => item.product.id === this.product?.id)?.count)
  indexImage = 0
  detail?: number
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.detail = param["id"]
    })
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
  addToCart() {
    if (this.product !== undefined) {
      this.cartHolder.addProduct(this.product)
    }
  }
  removeFromCart() {
    if (this.product !== undefined) {
      this.cartHolder.removeProduct(this.product)
    }
  }


}
