import { computed, inject, Injectable, signal } from '@angular/core';
import {  CartService } from './cart.service';
import { ProductsDetail } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class CartHolderService {
  private cartApi = inject(CartService)
  allProducts = signal<CartProduct[]>([])
  uniqeProduct = computed(() => this.allProducts().length)
  totalPrice = computed(() => this.allProducts().reduce((acc, curr) => acc + curr.product.price * curr.count, 0))
  constructor() {
    this.readProductStorage()
  }
  addProduct(product: ProductsDetail) {
    this.allProducts.update((allProducts) => {
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
    this.cartApi.updateCartProduct(1, {
      products: this.allProducts().map((item) => {
        return { id: item.product.id, quantity: item.count }
      })
    }).subscribe((resultupdate) => {
      console.log(resultupdate)
    })

    this.saveProductStorage()
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
    this.saveProductStorage()
  }
  private saveProductStorage() {
    localStorage.setItem("cart", JSON.stringify(this.allProducts()));
  }
  private readProductStorage() {
    let cartData = localStorage.getItem("cart")
    if (cartData !== undefined && cartData !== null) {
      this.allProducts.set(JSON.parse(cartData))
    }
  }

}
export interface CartProduct {
  product: ProductsDetail,
  count: number
}