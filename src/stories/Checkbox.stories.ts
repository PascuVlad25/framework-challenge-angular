import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'ToDo List/Checkbox',
  component: CheckboxComponent,  
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
    checkIcon: faCheck
};

export const Custom = Template.bind({});
Custom.args = {
    checkIcon: faCheck,
    color: 'gradient-2',
    isCompleted: true,
};