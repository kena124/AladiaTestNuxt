import type { Meta, StoryFn } from '@storybook/vue3';
import FormField from './FormField.vue';

export default {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text', description: 'The unique ID for the input field' },
    label: { control: 'text', description: 'The label text for the field' },
    type: { 
      control: 'text', 
      description: 'The type of the input field (e.g., text, password, email)' 
    },
    placeholder: { control: 'text', description: 'Placeholder text for the input field' },
    modelValue: { control: 'text', description: 'The bound value of the input field' },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { FormField },
  setup() {
    return { args };
  },
  template: `
    <FormField 
      v-bind="args" 
      v-model="args.modelValue" 
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  id: 'name',
  label: 'Name',
  type: 'text',
  placeholder: 'Enter your name',
  modelValue: '',
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  id: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  modelValue: '',
};

export const EmailField = Template.bind({});
EmailField.args = {
  id: 'email',
  label: 'Email',
  type: 'email',
  placeholder: 'Enter your email',
  modelValue: '',
};