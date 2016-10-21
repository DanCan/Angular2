/**
 * Created by dan.cannova on 7/16/16.
 */

import { Component } from '@angular/core';
import { TodoInput } from './components/todo-input';
import { TodoList } from './components/todo-list';
import { StatusSelector } from './components/status-selector';
import { SearchBox } from './components/search-box';

//I don't like how the term and status are just being passed between Components here.
//TODO: Question-Should this file own a reference to term and status. it works without but feels off.
@Component({
  moduleId: module.id,
  selector: 'sd-todo',
  directives: [TodoInput, TodoList, StatusSelector, SearchBox],
  template: `
<div> 
  Search:<search-box (update)="term = $event"></search-box>
  Create New:<todo-input></todo-input> 
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
