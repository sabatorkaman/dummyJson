import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDetail } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss'
})
export class TodoEditComponent implements OnInit {
  private route = inject(ActivatedRoute)
  todo?: TodoDetail
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.todo = param["edit"]
      console.log(this.todo?.completed)
    })
  }
}


////edit todo not completed