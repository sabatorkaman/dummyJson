import { AfterViewInit, Component, computed, Inject, inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterLink ,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButton,RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  private authontication = inject(AuthenticationService)
  private router = inject(Router)

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


}
