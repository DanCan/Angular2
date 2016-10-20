import { Component } from '@angular/core';

import { TodoService } from '../../shared/index'
import {TodoModel} from "../../shared/todo/todo-model";

//TODO: setup form to pass input instead of keyup.enter
@Component ({
  selector: 'todo-input',
  template: `
<div>
  <input #txtInput type="text" (keyup.enter)="onClick(txtInput.value)"> 
</div>
`
})

export class TodoInput {
  constructor( public todoService:TodoService) {

  }

  onClick(value){
    if (value == '') return;

    this.todoService.addTodo(new TodoModel(value));
    console.log(this.todoService.todos);
  }
}
