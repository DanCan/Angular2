import { Component, Input, Output, EventEmitter } from '@angular/core';
import {TodoModel} from "../../shared/todo/todo-model";
import {EventEmitter} from "@angular/common/src/facade/async";

@Component ({
  selector: 'todo-item-renderer',
  template: `
<style>
  .completed {
    text-decoration: line-through;
  }
</style>
<div>
  <span [ngClass]="todo.status">{{todo.title}}</span>
  <button (click)="toggle.emit(todo)">Toggle</button>
</div>
`
})

export class TodoItemRenderer {
  @Input() todo:TodoModel;
  @Output() toggle:EventEmitter = new EventEmitter();

  constructor() { }
}
