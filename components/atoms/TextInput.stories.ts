import TextInput from './TextInput.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof TextInput> = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'Defines the type of the input field.',
    },
    label: {
      control: 'text',
      description: 'The label for the input field.',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the input.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field.',
    },
    icon: {
      control: 'text',
      description: 'Optional icon to display inside the input field.',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display below the input.',
    },
  },
};

export default meta;

const Template: StoryFn<typeof TextInput> = (args) => ({
  components: { TextInput },
  setup() {
    return { args };
  },
  template: `<TextInput v-bind="args" v-model="args.modelValue" />`,
});

// Default Story
export const Default = Template.bind({});
Default.args = {
  label: 'Username',
  placeholder: 'Enter your username',
  type: 'text',
  modelValue: '',
};

// Story with Icon
export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  type: 'email',
  icon: 'fas fa-envelope',
  modelValue: '',
};

// Password Input Story
export const Password = Template.bind({});
Password.args = {
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
  modelValue: '',
};

// Disabled Input Story
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'Cannot enter text',
  type: 'text',
  disabled: true,
  modelValue: '',
};

// Story with Error
export const WithError = Template.bind({});
WithError.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  type: 'email',
  errorMessage: 'Invalid email address',
  modelValue: '',
};