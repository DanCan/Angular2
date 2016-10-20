import { Component } from '@angular/core';

import { TodoService } from '../../shared/index'
import {TodoModel} from "../../shared/todo/todo-model";

@Component ({
  selector: 'todo-input',
  template: `
<div>
  <input #txtInput type="text"> 
  <button (mousedown)="onClick(txtInput.value)" >Click Me!</button>
</div>
`
})

export class TodoInput {
  constructor( public todoService:TodoService) {

  }

  onClick(value){
    this.todoService.addTodo(new TodoModel(value));
    console.log(this.todoService.todos);
  }
}
