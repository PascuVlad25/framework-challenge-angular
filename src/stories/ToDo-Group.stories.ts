import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { TodoCardComponent } from 'src/app/components/todo-card/todo-card.component';
import { TodoGroupComponent } from 'src/app/components/todo-group/todo-group.component';
import { Todo } from 'src/app/components/todo/models';

export default {
  title: 'ToDo List/ToDo Group',
  component: TodoGroupComponent,  
  decorators: [
    moduleMetadata({
      declarations: [TodoCardComponent, CheckboxComponent],
      imports: [CommonModule, FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<TodoGroupComponent> = (args: TodoGroupComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
    todos: [
        new Todo('Debug the app', 'Try to find all the bugs! Regression needed.', new Date(), 'gradient-1'),
        new Todo('Debug the app', 'Try to find all the bugs! Regression needed.', new Date(), 'gradient-2'),
        new Todo('Debug the app', 'Try to find all the bugs! Regression needed.', new Date(), 'gradient-3'),
        new Todo('Debug the app', 'Try to find all the bugs! Regression needed.', new Date(), 'gradient-4'),
    ],
    title: 'Today',
};