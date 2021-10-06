import { Component, OnInit } from '@angular/core';
import { Todo, TodoGroup } from './models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  public cards = [
    {title: 'Create website', description: 'Dunno man', icon: 'rocket', color: 'blue'},
    {title: 'Take a break', description: 'Dunno man', icon: 'sleep', color: 'purple'},
    {title: 'Grocery shopping', description: 'Dunno man', icon: 'cart', color: 'green'},
  ];
  public groups: TodoGroup[] = [
    {
      title: 'Today', 
      filter: (todo: Todo) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return todo.deadline === today;
      },
      todos: [
        new Todo('Debug the app', new Date(), 'gradient-red'),
        new Todo('Order chinesse food', new Date(), 'gradient-blue')
      ]
    },
    {
      title: 'Tomorrow', 
      filter: (todo: Todo) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return todo.deadline === tomorrow;
      },
      todos: [
        new Todo('Feed the cat', new Date(), 'gradient-red')
      ]
    },
    {
      title: 'Next 5 days', 
      filter: (todo: Todo) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return todo.deadline === tomorrow;
      },
      todos: [
        new Todo('Watch React tutorial', new Date(), 'gradient-blue'),
      ]
    },
    {
      title: 'Later', 
      filter: (todo: Todo) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return todo.deadline === tomorrow;
      },
      todos: [
        new Todo('Watch a movie', new Date(), 'gradient-blue'),
        new Todo('Finish Angular app', new Date(), 'gradient-red'),
      ]
    }
  ]

  constructor() { }

  public getGroups(): TodoGroup[] {
    return this.groups.filter(group => group.todos.length > 0);
  }

  public isGroupDisplayed(group: TodoGroup): boolean {
    return group.todos.length > 0;
  }

  public addCard(): void {
    this.cards.push({
      title: 'Grocery shopping', description: 'Dunno man', icon: 'cart', color: 'green'
    })
  }
}
