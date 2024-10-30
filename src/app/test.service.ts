import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private http = inject(HttpClient)

  constructor() { }
  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('https://dummyjson.com/users')

  }

}
export interface UsersResponse {

  users: User[]
  total: number,
  skip: number,
  limit: number


}
export interface User {
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
  role: string

}
