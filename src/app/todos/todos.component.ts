import { Component, inject, OnInit } from '@angular/core';
import { TodoDetail, TodoService } from '../todo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  private todoApi = inject(TodoService)
  todos: TodoDetail[] = []
  limit = 2
  skip?: number
  completed: TodoDetail[] = []
  checked = false;
  disabled = false;
  ngOnInit(): void {
    this.moreProduct()
    console.log(this.checked)
  }

  moreProduct() {
    if (this.skip !== undefined) {
      this.skip += this.limit
    }
    else {
      this.skip = 0
    }
    this.todoApi.getTodoList(this.limit, this.skip).subscribe((item) => {
      console.log(item)
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

}
