import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule,MatButton,MatButtonModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss'
})
export class TodoAddComponent implements OnInit {
  private authentication = inject(AuthenticationService)
  private todoApi = inject(TodoService)
  todo = ""

  ngOnInit(): void {

  }
  submitClick() {
    let userId = this.authentication.userDetail()?.id
    if (userId !== undefined) {
      this.todoApi.addTodo({ todo: this.todo, completed: false, userId: userId, }).subscribe((itemTodo) => {
        console.log(itemTodo)
      
      })
    }
    this.todo=""
  }

}
