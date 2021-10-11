import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo/models';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input() todo!: Todo;
  @Input() todoIndex!: number;

  constructor() { }

  ngOnInit(): void {
  }

  public getColor(): string {
    return this.todo?.color || '';
  }

}
