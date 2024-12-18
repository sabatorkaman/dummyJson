import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private http = inject(HttpClient)
  constructor() { }
  getAllProducts(limit: number, skip: number): Observable<AllProducts> {
    return this.http.get<AllProducts>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  }
  getSearchProduct(q: string): Observable<AllProducts> {
    return this.http.get<AllProducts>(`https://dummyjson.com/products/search?q=${q}`)
  }
  fliterByCategort(category: string): Observable<AllProducts> {
    return this.http.get<AllProducts>(`https://dummyjson.com/products/category/${category}`)

  }
  filterBySort(sortBy: "title" | "price", order: "asc" | "desc"): Observable<AllProducts> {
    return this.http.get<AllProducts>(`https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`)
  }
  getAllCategory(): Observable<string[]> {
    return this.http.get<string[]>('https://dummyjson.com/products/category-list')
  }
  getProductDetail(id:number):Observable<ProductsDetail> {
    return this.http.get<ProductsDetail>(`https://dummyjson.com/products/${id}`)
  }

}


export interface AllProducts {
  products: ProductsDetail[]
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

export interface FilterResponse {
  products: ProductsDetail[],
  total: number,
  skip: number,
  limit: number
}
export interface ProductFilter {
  id: number,
  title: string,
  category: string
}
export interface AllSortProducts {
  products: ProductSortDetail[],
  total: number,
  skip: number,
  limit: number
}
export interface ProductSortDetail {
  id: number,
  title: string
  price: number
}