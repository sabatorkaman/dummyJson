import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { AuthenticationService } from '../../authentication.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [JsonPipe, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterLink, RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private api = inject(ApiService)
  private fb = inject(FormBuilder)
  private authentication = inject(AuthenticationService)
  private router = inject(Router)
  loginForm: FormGroup
  isLoading = false

  constructor() {
    this.loginForm = this.fb.group({
      username: this.fb.control('emilys', [
        Validators.required,
        Validators.minLength(4)]),
      password: this.fb.control('emilyspass'),
    });
  }

  loginClick() {
    this.isLoading = true
    this.api.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.isLoading = false
          this.api.getUserDetail(res.id)
            .subscribe((userDetail) => {
              this.authentication.saveData(res, userDetail)
              this.router.navigate(['/home'])
            })
          console.log(this.loginForm)
         
        },
        error: (err) => {
          console.log(err)
          this.isLoading = false
          this.loginForm.setErrors({ 'loginError': true })
        },
        complete: () => this.isLoading = false
      })
  }
}
