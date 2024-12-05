import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetail, TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss'
})
export class TodoEditComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private todoApi = inject(TodoService)
  id?: number
  todo?: TodoDetail
  todoValue = ""
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.id = param["edit"]
      console.log(this.id)
      if (this.id !== undefined) {
        this.todoApi.getTodoSingle(this.id).subscribe((item) => {
          console.log(item)
          this.todo = item
        })

      }
    })
  }
  editClick() {
    if (this.todo !== undefined) {
      this.todo.todo = ""

    }

  }
  submitClick() {
    if (this.todo !== undefined) {
      this.todo.todo = this.todoValue
    }
    console.log(this.todo)
  }
}


////edit todo not completed