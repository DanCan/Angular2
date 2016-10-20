/**
 * Created by dan.cannova on 7/16/16.
 */

import { Component } from '@angular/core';
import { TodoInput } from './components/todo-input';
import { TodoList } from './components/todo-list';
import { StatusSelector } from './components/status-selector';
import { SearchBox } from './components/search-box';

@Component({
  moduleId: module.id,
  selector: 'sd-todo',
  directives: [TodoInput, TodoList, StatusSelector, SearchBox],
  template: `
<div> 
  <search-box (update)="term = $event"></search-box>
  <todo-input></todo-input> 
  <status-selector (select)="status = $event"></status-selector>
  <todo-list 
    [status]="status"
    [term]="term"
    ></todo-list>
</div>
  `,
  styleUrls: ['todo.component.css'],
})

export class TodoComponent {}
