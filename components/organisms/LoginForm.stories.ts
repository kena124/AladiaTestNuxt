// components/organisms/LoginForm.stories.ts
import type { Meta, StoryFn } from '@storybook/vue3';
import LoginForm from './LoginForm.vue';

export default {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { LoginForm },
  setup() {
    return { args };
  },
  template: '<LoginForm @submit="onSubmit" />',
});

export const Default = Template.bind({});
Default.args = {};