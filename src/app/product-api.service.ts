import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private http = inject(HttpClient)
  constructor() { }
  getProducts(limit: number, skip: number): Observable<AllProducts> {
    return this.http.get<AllProducts>(`https://dummyjson.com/products/?limit=${limit}&skip=${skip}`)
  }
}


export interface AllProducts {
  "products": ProductsDetail[]
  total: number,
  skip: number,
  limit: number
}
export interface ProductsDetail {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: 4.94,
  stock: 5,
  tags: string[],
  brand: string,
  sku: string,
  weight: number,
  dimensions: {
    width: number,
    height: number,
    depth: number
  },
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus: string,
  reviews: [
    {
      rating: number,
      comment: string,
      date: string,
      reviewerName: string,
      reviewerEmail: string
    }
  ],
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
  },
  thumbnail: string,
  images: string[]
}

