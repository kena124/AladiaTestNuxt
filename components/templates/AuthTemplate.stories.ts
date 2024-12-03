import type { Meta, StoryFn } from '@storybook/vue3';
import AuthTemplate from './AuthTemplate.vue';

export default {
  title: 'Templates/AuthTemplate', 
  component: AuthTemplate, 
  tags: ['autodocs'], 
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the header of the authentication template.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Welcome' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The `AuthTemplate` is a layout component designed for authentication pages. It provides a styled container with a title and slot for custom form content.',
      },
    },
  },
} as Meta<typeof AuthTemplate>;

const Template: StoryFn<typeof AuthTemplate> = (args) => ({
  components: { AuthTemplate },
  setup() {
    return { args };
  },
  template: `
    <AuthTemplate v-bind="args">
      <form @submit.prevent>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </AuthTemplate>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Welcome Back',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default `AuthTemplate` setup for login pages. Includes a basic email and password form.',
    },
  },
};

export const SignUp = Template.bind({});
SignUp.args = {
  title: 'Create Account',
};
SignUp.parameters = {
  docs: {
    description: {
      story: 'A variation of `AuthTemplate` designed for sign-up pages with a custom title.',
    },
  },
};