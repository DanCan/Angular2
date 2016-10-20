import { Component, Input } from '@angular/core';
import { TodoItemRenderer } from './todo-item-renderer';
import { StartedPipe } from '../../shared/pipes/started-pipe';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { TodoService } from '../../shared/index';

@Component ({
  selector: 'todo-list',
  pipes: [StartedPipe, SearchPipe],
  directives: [TodoItemRenderer],
  template: `
  <div>
    <ul>
      <li *ngFor="let todo of todoService.todos 
      | started : status
      | search : term
      ">
        <todo-item-renderer 
          [todo]="todo"
          (toggle)="todoService.toggleTodo($event)"
        ></todo-item-renderer>
      </li>
    </ul>
  </div>
`
})

export class TodoList {
  @Input() status;
  @Input() term;

  constructor( public todoService:TodoService) { }

}
