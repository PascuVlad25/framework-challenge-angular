import { Component } from '@angular/core';
import { Todo, TodoGroup } from './models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  public cards = [
    {title: 'Create website', description: 'Dunno man', icon: 'rocket', color: 'gradient-1'},
    {title: 'Take a break', description: 'Dunno man', icon: 'sleep', color: 'gradient-2'},
    {title: 'Grocery shopping', description: 'Dunno man', icon: 'cart', color: 'gradient-3'},
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
        new Todo('Debug the app', 'Try to find all the bugs! Regression needed.', new Date(), 'gradient-1'),
        new Todo('Order chinesse food', 'Sushikage - 0791-897-15x. 10x Maki Avocado, 10x California Rolls, 1x Miso Ramen + Nigiri', new Date(), 'gradient-2'),
        {...new Todo('Send files to Dan', 'Excel documents with statistics and the pdf file', new Date(), 'gradient-1'), completed: true },
        {...new Todo('Call grandma', 'It\'s family time yo know', new Date(), 'gradient-3'), completed: true }
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
        new Todo('Feed the cat', 'You don\'t want Fritzy boi to be grumpy.', new Date(), 'gradient-3'),
        {...new Todo('Watch a movie', 'Watchlist: Forest Gump, The Godfather, Pulp Fiction', new Date(), 'gradient-5'), completed: true},
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
        new Todo('Watch React tutorial', 'The advance guide regarding React Hooks and Redux', new Date(), 'gradient-4'),
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
        new Todo('Watch a movie', 'Watchlist: Forest Gump, The Godfather, Pulp Fiction', new Date(), 'gradient-2'),
        new Todo('Finish Angular app', 'Don\'t forget to add that shiny animation!!!', new Date(), 'gradient-3'),
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
      title: 'Grocery shopping', description: 'Dunno man', icon: 'cart', color: 'gradient-1'
    })
  }
}
