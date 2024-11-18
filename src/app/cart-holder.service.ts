import { inject, Injectable } from '@angular/core';
import { CartDetail, CartService } from './cart.service';
import { ProductsDetail } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class CartHolderService {
  private cartApi = inject(CartService)
  // private cart:CartDetail={}
  constructor() { }
  id = undefined
  addProduct(product:ProductsDetail) {
  
  }

}
