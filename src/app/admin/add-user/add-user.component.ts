import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { AddNewUser, ApiService } from '../../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule ,ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  private router=inject(ActivatedRoute)
  private pi=inject(ApiService)
  private fb = inject(FormBuilder)
  addUser:FormGroup


  constructor(){
    this.addUser=this.fb.group({

      firstName:this.fb.control('',[
        Validators.required,
        
      ]),
      lastName:this.fb.control('',[
        Validators.required
      ]),
      age:this.fb.control('',[
        Validators.required
      ]),
      email:this.fb.control('',[
        Validators.required
      ]),
      gender:this.fb.control('',[
        Validators.required
      ]),

      password:this.fb.control('',[
        Validators.required
      ]),
      confrimPassword:this.fb.control('',[
        Validators.required
      ]),
      userName:this.fb.control('',[
        Validators.required
      ]),
      birthDate:this.fb.control('',[
        Validators.required
      ]),
      city:this.fb.control('',[
        Validators.required
      ]),

    }

    )

    

  }
  addUserClick(){
    this.pi.addNewUser(this.addUser.value).subscribe((data)=>{
      console.log(data)
    })
  }


}
