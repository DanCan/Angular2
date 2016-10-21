import { Component } from '@angular/core';

import { TodoService } from '../../shared/index'
import {TodoModel} from "../../shared/todo/todo-model";

@Component ({
  selector: 'todo-input',
  template: `
<div>
  <form (submit)="onSubmit()">
    <input #txtInput type="text" [(ngModel)]="todoModel.title" name="title"> 
  </form>

</div>
`
})

export class TodoInput {
  todoModel: TodoModel = new TodoModel();

  constructor( public todoService:TodoService) {  }

  onSubmit(){
    if (this.todoModel.title == '') return;

    this.todoService.addTodo(this.todoModel);
    console.log(this.todoService.todos);
    this.todoModel = new TodoModel();
  }
}
