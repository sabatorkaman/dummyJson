import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormGroup } from '@angular/forms';
import { UsersComponent } from "../admin/users/users.component";
import { AddUserComponent } from "../admin/add-user/add-user.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersComponent, AddUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  private router = inject(ActivatedRoute)
  private authenticated = inject(AuthenticationService)
  loginForm: FormGroup | undefined
  dataHome: FormGroup | undefined = undefined
  ngAfterViewInit(): void {
    
     console.log( this.authenticated.loginResponse)
   
  }
  test() {
    console.log(this.dataHome)
    alert("hi")
  }
}
