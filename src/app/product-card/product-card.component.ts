import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductsDetail } from '../product-api.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { CartHolderService } from '../cart-holder.service';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CurrencyPipe, MatChipsModule, RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'

})
export class ProductCardComponent implements OnInit {
  @Input() product?: ProductsDetail
  private cartHolder = inject(CartHolderService)
  imageIndex = 0

  ngOnInit(): void {

  }
  addToCartClicked() {
    if (this.product !== undefined) {
      this.cartHolder.addProduct(this.product)
    }
  }

  nextImage() {
    if (this.product !== undefined) {
      if (this.product?.images.length > this.imageIndex + 1) {
        this.imageIndex++
      }
    }
  }
  prveImage() {
    if (this.imageIndex > 0) {
      this.imageIndex--
    }
  }
}
