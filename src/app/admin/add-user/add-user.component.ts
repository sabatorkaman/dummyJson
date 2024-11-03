import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { AddNewUser, ApiService } from '../../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatNativeDateModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  providers: [
    MatDatepickerModule,
  ],
})
export class AddUserComponent {
  private router = inject(ActivatedRoute)
  private pi = inject(ApiService)
  private fb = inject(FormBuilder)
  addUser: FormGroup
  city = ""

  constructor() {
    this.addUser = this.fb.group({

      firstName: this.fb.control('', [
        Validators.required,
        Validators.maxLength(5)

      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.maxLength(5)
      ]),
      age: this.fb.control('', [
        Validators.required,

      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      gender: this.fb.control('', [
        Validators.required
      ]),

      password: this.fb.control('', [
        Validators.required
      ]),
      confrimPassword: this.fb.control('', [
        Validators.required
      ]),
      userName: this.fb.control('', [
        Validators.required
      ]),
      birthDate: this.fb.control('', [
        Validators.required
      ]),
      address: this.fb.group({
        city: this.fb.control('', [
          Validators.required
        ])
      })
    }, { Validators: this.checked("password", "confrimPassword") }
    )
  }
  addUserClick() {
    this.pi.addNewUser(this.addUser.value).subscribe((data) => {
      console.log(data)
      console.log(data.confrimPassword)
    })
  }
  checked(password: string, confrimPassword: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
        passwordConfirmationInput = group.controls[confrimPassword];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
}
