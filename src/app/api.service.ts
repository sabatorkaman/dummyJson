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