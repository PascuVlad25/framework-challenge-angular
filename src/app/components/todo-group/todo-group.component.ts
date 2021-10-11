import { Component, Input } from '@angular/core';
import { Todo } from '../todo/models';

@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.scss']
})
export class TodoGroupComponent {
  @Input() title: string = '';
  @Input() todos: Todo[] = [];
  public isListToggled = true;

  private maxTodosDisplayed = 3;


  public getTasksCount(): string {
    const notCompletedTodos = this.todos.filter((todo) => !todo.completed);
    if(notCompletedTodos.length === 0) {
      return 'No tasks';
    }
    return notCompletedTodos.length === 1 ? '1 task' : `${notCompletedTodos.length} tasks`;
  }

  public getToggleText(): string {
    return this.isListToggled ? 'Show more' : 'Show less';
  }

  public toggleList(): void {
    this.isListToggled = !this.isListToggled;
  }

  public isListLong(): boolean {
    return this.todos.length > this.maxTodosDisplayed;
  }

  public getTodos(): Todo[] {
    if(!this.isListToggled || !this.isListLong()) {
      return this.todos;
    }
    return this.todos.slice(0, this.maxTodosDisplayed);
  }
}
