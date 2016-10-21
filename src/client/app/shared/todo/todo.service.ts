import { Injectable } from '@angular/core';
import {TodoModel} from './todo-model';

@Injectable()
export class TodoService{
  todos:TodoModel[] = [
    new TodoModel("eat"),
    new TodoModel("sleep"),
    new TodoModel("dance", "completed"),
    new TodoModel("code"),
    new TodoModel("work"),
    new TodoModel("play"),
    new TodoModel("charm", "completed"),
    new TodoModel("exercise")
  ];

  addTodo(todo:TodoModel){
    this.todos= [...this.todos, todo];
  }

  //!~ Originally this was mutating a property on the TodoModel
  toggleTodo(todo:TodoModel){

    // For performance reason, best practices and patterns, we should avoid muting properties.
    // Instead, we should assign new instances each time something updates.
    const i = this.todos.indexOf(todo);
    const status = todo.status == "started" ? "completed" : "started";
    const toggledTodo = Object.assign({}, todo, {status});

    this.todos = [
      ...this.todos.slice(0,i),
      toggledTodo,
      ...this.todos.slice(i+1)
    ];
  }
}
