import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private api = inject(ApiService)
  private fb = inject(FormBuilder)

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
          this.isLoading=false
        },
        error: (err) => {
          console.log(err)
          this.isLoading=false
          this.loginForm.setErrors({'loginError': true})
        },
        complete: ()=> this.isLoading=false
      })

  }
}
