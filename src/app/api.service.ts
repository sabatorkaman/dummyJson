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
  getUserDetail(id:number): Observable<UserDetail> {
    return this.http.get<UserDetail>(`https://dummyjson.com/users/${id}`)
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
export interface UserDetail {
  role: string
}