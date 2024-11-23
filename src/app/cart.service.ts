import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient)
  constructor() { }

  getCartUser(id: number):Observable<CartDetail> {
   return this.http.get<CartDetail>(`https://dummyjson.com/carts/${id}`)

  }
}

export interface CartDetail {
  id?: number,
  products: CartProduct[]
  total: number,
  discountedTotal: number,
  userId: number,
  totalProducts: number,
  totalQuantity: number
}
export interface CartProduct {
  id: number,
  title: string,
  price: null,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedTotal: number,
  thumbnail: string



}