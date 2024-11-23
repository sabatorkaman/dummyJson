import { AfterViewInit, Component, computed, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ProductApiService } from '../product-api.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, RouterLinkActive, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnInit {
  
  private document = inject<Document>(DOCUMENT)
  private authontication = inject(AuthenticationService)
  private router = inject(Router)
  private productApi = inject(ProductApiService)
  categories?: string[]
  ngOnInit(): void {

    this.productApi.getCategoryList().subscribe((category) => {
      this.categories = category
    })
  }
  theme: 'dark' | 'light' | 'blue' = 'dark'

  name = computed(() => {
    let res = this.authontication.loginResponse()
    if (res !== undefined) {
      return res.firstName + " " + res.lastName
    }
    else {
      return undefined
    }

  })
  role = computed(() => {
    return this.authontication.userDetail()?.role
    //  let detail= this.authontication.userDetail()
    //  if(detail !== undefined){
    //   return detail.role
    //  }
    //  else{
    //   return
    //  }
  })

  ngAfterViewInit(): void {
    console.log(this.authontication.loginResponse)
    this.authontication.loginResponse()
  }
  logOut() {
    this.authontication.cleardata()
    this.router.navigate(["/login"])
    setTimeout(() => {

    }, 30)
  }
  changeTheme() {

    if (this.theme == "dark") {
      this.document.documentElement.classList.remove("dark-theme")
      this.document.documentElement.classList.add("light-theme")
      this.theme = "light"
    } else if (this.theme == "light") {
      this.document.documentElement.classList.add("blue-theme")
      this.document.documentElement.classList.remove("light-theme")
      this.theme = "blue"
    }
    else {
      this.document.documentElement.classList.add("dark-theme")
      this.document.documentElement.classList.remove("blue-theme")
      this.theme = "dark"
    }




  }



}
