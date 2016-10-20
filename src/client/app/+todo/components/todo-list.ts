import { Component, Input } from '@angular/core';
import { TodoItemRenderer } from './todo-item-renderer';
import { StartedPipe } from '../../shared/pipes/started-pipe';
import { TodoService } from '../../shared/index';

// | started : 'started'

@Component ({
  selector: 'todo-list',
  pipes: [StartedPipe],
  directives: [TodoItemRenderer],
  template: `
  <div>
    <ul>
      <li *ngFor="let todo of todoService.todos | started">
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

  constructor( public todoService:TodoService) { }

}
