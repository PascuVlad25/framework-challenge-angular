// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { TodoCardComponent } from 'src/app/components/todo-card/todo-card.component';
import { Todo } from 'src/app/components/todo/models';

export default {
  title: 'ToDo List/ToDo Card',
  component: TodoCardComponent,  
  decorators: [
    moduleMetadata({
      declarations: [CheckboxComponent],
      imports: [CommonModule, FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<TodoCardComponent> = (args: TodoCardComponent) => ({
  props: args,
});

export const Gradient1 = Template.bind({});
Gradient1.args = {
  todo: new Todo('Debug the app', 'Try to find all the bugs! Regression needed.', new Date(), 'gradient-1'),
};

export const Gradient2 = Template.bind({});
Gradient2.args = {
  todo: {
    title:'Order chinesse food', 
    description: 'Sushikage - 0791-897-15x. 10x Maki Avocado, 10x California Rolls, 1x Miso Ramen + Nigiri',
    color: 'gradient-2',
    deadline: new Date(),
    completed: true
  }
};