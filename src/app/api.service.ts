import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)

  constructor() {

  }
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://dummyjson.com/user/login', {
      "username": username,
      "password": password
    })
  }
  getUserDetail(id: number): Observable<Userinformation> {
    return this.http.get<Userinformation>(`https://dummyjson.com/users/${id}`)
  }
  
  getAllUser(limit: number, skip: number, q: string): Observable<AllUsers> {
    return this.http.get<AllUsers>(`https://dummyjson.com/users/search?limit=${limit}&skip=${skip}&q=${q}`)
  }

  addNewUser(data: AddNewUser): Observable<AddNewUser> {
    return this.http.post<AddNewUser>('https://dummyjson.com/users/add', data)
  }

  deleteUser(id: number): Observable<Userinformation> {
    return this.http.delete<Userinformation>(`https://dummyjson.com/users/${id}`)
  }
}
export interface LoginResponse {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  accessToken: string, // JWT accessToken (for backward compatibility) in response and cookies
  refreshToken: string // refreshToken in response and cookies

}

export interface AllUsers {
  users: Userinformation[],
  total: number,
  skip: number,
  limit: number

}
export interface Crypto {

  coin: string,
  wallet: string,
  network: string

}
export interface Userinformation {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: string,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: string,
  image: string,
  bloodGroup: string,
  height: number,
  weight: number,
  eyeColor: string,
  hair: {
    color: string,
    type: string
  },
  ip: string,
  address: Adress,
  macAddress: string,
  university: string,
  bank: Bank[],
  company: Company[],
  ein: string,
  ssn: string,
  userAgent: string,
  crypto: Crypto
  role: string
}

export interface Adress {
  address: string,
  city: string,
  state: string,
  stateCode: string,
  postalCode: string,
  coordinates: {
    lat: number,
    lng: number
  },
  country: string


}
export interface Bank {
  cardExpire: string,
  cardNumber: string,
  cardType: string,
  currency: string,
  iban: string
}
export interface Location {
  lat: number
  lng: number
}
export interface Company {
  department: string,
  name: string,
  title: string,
  address: {
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    coordinates: Location[],
    country: string
  }
}
// export interface Newusers {

//   id: number,
//   username: string,
//   email: string,
//   firstName: string,
//   lastName: string,
//   gender: string,
//   image: string,
//   accessToken: string, // JWT accessToken (for backward compatibility) in response and cookies
//   refreshToken: string // refreshToken in response and cookies

// }
// export interface User {
//   id: number,
//   firstName: string,
//   lastName: string,
//   maidenName: string,
//   age: number,
//   gender: string,
//   email: string,
//   phone: string,
//   username: string,
//   password: string,
//   birthDate: string,
//   image: string,
//   bloodGroup: string,
//   height: number,
//   weight: number,
//   eyeColor: string,
// }

export interface AddNewUser {

  id: number | null,
  firstName: string,
  lastName: string,
  age: number,
  gender: string,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: string,
  confrimPassword: string

}