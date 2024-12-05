import { Component, inject, OnInit } from '@angular/core';
import { TodoDetail, TodoService } from '../todo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';


@Component({

  selector: 'app-todos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSlideToggleModule, MatIconModule, RouterLink, MatCheckboxModule, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  private todoApi = inject(TodoService)
  todos: TodoDetail[] = []
  limit = 4
  skip?: number
  completed: TodoDetail[] = []
  checked = false;
  disabled = false;
  id?: number
  test: boolean = false
  // checked2=false
  ngOnInit(): void {
    console.log(this.test)
    this.moreProduct()
  }

  moreProduct() {

    if (this.skip !== undefined) {
      this.skip += this.limit
    }
    else {
      this.skip = 0
    }
    this.todoApi.getTodoList(this.limit, this.skip).subscribe((item) => {
      let unCompletedNewItems = item.todos.filter((item) => item.completed === false)
      this.todos = this.todos.concat(unCompletedNewItems)
      let completedNewItems = item.todos.filter((item) => item.completed === true)
      this.completed = this.completed.concat(completedNewItems)
    })
  }

  toggleCompleted() {
    this.checked = !this.checked
    console.log(this.checked)
  }
  removeTodo(item: TodoDetail) {
    this.id = item.id
    if (this.id !== undefined) {
      this.todoApi.deleteTodo(this.id).subscribe((item) => {
        let result = this.todos.filter((todo) => todo.id !== item.id)
        console.log(result)
        console.log(item)
        this.todos = result
      })
    }
  }
  removeCompletedTodo(complete: TodoDetail) {
    let result = this.completed.filter((item) => item.id !== complete.id)
    this.completed = result
  }
  changeCompleted(item: TodoDetail) {
    if (item.completed === false) {
      item.completed = true
      let result = this.todos.filter((el) => {
        return el.completed === item.completed
      })
      this.completed = this.completed.concat(result)

      let newResult = this.todos.filter((el) => el.completed !== item.completed)
      console.log(newResult)
      this.todos = newResult
    }
  }
  checkBoxClick(item: TodoDetail) {
    if (item.completed === false) {
      item.completed = true
      // let result = this.todos.filter((el) => {
      //   return el.completed === item.completed
      // })
      this.completed = this.completed.concat([item])
      this.todos = this.todos.filter((el) => el.completed !== item.completed)
    }
  }
}
