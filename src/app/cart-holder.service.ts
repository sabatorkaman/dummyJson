import { inject, Injectable, signal } from '@angular/core';
import { CartDetail, CartService } from './cart.service';
import { ProductsDetail } from './product-api.service';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartHolderService {
  allProducts = signal<CartProduct[]>([])
  addProduct(product: ProductsDetail) {
    this.allProducts.update((allProducts) => {
      debugger
      let result = allProducts.find((item) => {
        return item.product.id === product.id
      })
      if (result === undefined) {
        allProducts.push({ product: product, count: 1 })
      }
      else {
        result.count++
      }
      return [...allProducts]
    })

  }
  removeProduct(product: ProductsDetail) {
    this.allProducts.update((allProducts) => {
      let result = allProducts.find((item) => {
        return item.product.id === product.id
      })
      if (result !== undefined) {
        result.count--
        if (result.count === 0) {
          allProducts = allProducts.filter((item) => {
            return item.count !== 0
          })

        }
      }
      return [...allProducts] //یک شی جدید درست کند
    })
  }
}
export interface CartProduct {
  product: ProductsDetail,
  count: number
}