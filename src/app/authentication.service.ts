import { Injectable, signal, WritableSignal } from '@angular/core';
import { LoginResponse, Userinformation } from './userService.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginResponse: WritableSignal<LoginResponse | undefined> = signal(undefined)
  userDetail: WritableSignal<Userinformation | undefined> = signal(undefined)
  constructor() {
    let user = localStorage.getItem("user")
    if (user !== null) {
      this.loginResponse.set(JSON.parse(user))
    }
    let detail = localStorage.getItem("detail")
    if (detail !== null) {
      this.userDetail.set(JSON.parse(detail))

    }
  }

  saveData(loginResopnse: LoginResponse, userDetail: Userinformation) {
    this.loginResponse.set(loginResopnse)
    this.userDetail.set(userDetail)
    localStorage.setItem("user", JSON.stringify(loginResopnse))
    console.log(userDetail.role)
    localStorage.setItem("detail", JSON.stringify(userDetail))
  }
  cleardata() {
    localStorage.removeItem("user")
    localStorage.removeItem("detail")
    this.userDetail.set(undefined)
    this.loginResponse.set(undefined)

  }
}
