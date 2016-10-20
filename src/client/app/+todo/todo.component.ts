/**
 * Created by dan.cannova on 7/16/16.
 */

import { Component } from '@angular/core';
import { TodoInput } from './components/todo-input'
import { TodoList } from './components/todo-list'

@Component({
  moduleId: module.id,
  selector: 'sd-todo',
  directives: [TodoInput, TodoList],
  template: `
<div> 
  <todo-input></todo-input> 
  <todo-list [status]="'started'"></todo-list>
</div>
  `,
  styleUrls: ['todo.component.css'],
})

export class TodoComponent {}
