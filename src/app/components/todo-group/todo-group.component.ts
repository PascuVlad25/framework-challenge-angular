import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo/models';

@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.scss']
})
export class TodoGroupComponent implements OnInit {
  @Input() title: string = '';
  @Input() todos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public getToggleText(): string {
    return 'Show more';
  }

  public toggleList(): void {
    
  }

  public isListLong(): boolean {
    return this.todos.length > 3;
  }

}
