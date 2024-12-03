import type { Meta, StoryFn } from '@storybook/vue3';
import ElButton from './ElButton.vue';

export default {
  title: 'Atoms/ElButton',
  component: ElButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
    },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { ElButton },
  setup() {
    return { args };
  },
  template: '<ElButton :type="args.type" @click="args.onClick">Element Plus Button</ElButton>',
});

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};
