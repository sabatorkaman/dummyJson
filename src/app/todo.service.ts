import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient)

  constructor() { }
  getTodoList(limit: number, skip: number): Observable<AllTodo> {
    return this.http.get<AllTodo>(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`)
  }
  getTodoSingle(id: number): Observable<TodoDetail> {
    return this.http.get<TodoDetail>(`https://dummyjson.com/todos/${id}`)
  }
  addTodo(newTodo: TodoDetail): Observable<TodoDetail> {
    return this.http.post<TodoDetail>('https://dummyjson.com/todos/add', newTodo)
  }
  deleteTodo(id: number): Observable<TodoDetail> {
    return this.http.delete<TodoDetail>(`https://dummyjson.com/users/${id}`)

  }
  updateTodo(id: number, completed: boolean): Observable<TodoDetail> {
    return this.http.put<TodoDetail>(`https://dummyjson.com/todos/${id}`, {completed:completed})
  }
}
export interface AllTodo {
  todos: TodoDetail[],
  total: number,
  skip: number,
  limit: number
}
export interface TodoDetail {
  id?: number,
  todo: string,
  completed: boolean,
  userId: number
}
