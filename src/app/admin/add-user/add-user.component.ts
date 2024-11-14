import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../userService.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerControl, MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatCardContent, MatCardActions, MatCard, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  providers: [
    MatDatepickerModule,
  ],
})
export class AddUserComponent {
  private router = inject(ActivatedRoute)
  private api = inject(ApiService)
  private fb = inject(FormBuilder)
  addUser: FormGroup
  userId?: number
  constructor() {
    this.addUser = this.fb.group({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3)

      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      age: this.fb.control('', [
        Validators.required,
        Validators.maxLength(2)

      ]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      gender: this.fb.control('', [
        Validators.required
      ]),

      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      confrimPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      username: this.fb.control('', [
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
    },
      { validators: this.checked("password", "confrimPassword") }
    )
  }
  ngOnInit(): void {
    this.router.queryParams.subscribe(param => {
      this.userId = param["id"]
      console.log(this.userId)
      if (this.userId !== undefined) {
        this.api.getUserDetail(this.userId)
          .subscribe((element) => {
            let newDate = new Date(element.birthDate);
            console.log(element)
            this.addUser.get("firstName")?.setValue(element.firstName)
            this.addUser.get("lastName")?.setValue(element.lastName)
            this.addUser.get("age")?.setValue(element.age)
            this.addUser.get("email")?.setValue(element.email)
            this.addUser.get("gender")?.setValue(element.gender)
            this.addUser.get("username")?.setValue(element.username)
            this.addUser.get("password")?.setValue(element.password)
            this.addUser.get("confrimPassword")?.setValue(element.password)
            this.addUser.get("birthDate")?.setValue(newDate)
            this.addUser.get("address")?.get("city")?.setValue(element.address.city)
            console.log(element.birthDate)
          })
      }
    })
  }
  submitClick() {
    if (this.userId !== undefined) {
      this.api.editUser(this.userId, this.addUser.value).subscribe((data) => {
        console.log(data)
      })
    }
    else {
      this.api.addNewUser(this.addUser.value).subscribe((data) => {
        console.log(data)
        console.log(data.birthDate)
      })
    }
  }

  editClick() {

  }
  checked(password: string, confrimPassword: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      let passwordInput = abstractControl.get(password)!!,
        passwordConfirmationInput = abstractControl.get(confrimPassword)!!;
      if (passwordInput.value !== passwordConfirmationInput.value) {
        let error = { notEquivalent: true }
        passwordConfirmationInput.setErrors(error)
        return error
      }
      else {
        passwordConfirmationInput.setErrors(null);
        return null
      }
    }
  }


}
