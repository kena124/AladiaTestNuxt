import type { Meta, StoryFn } from "@storybook/vue3";
import Input from "./Input.vue";

export default {
  title: "Atoms/Input",
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
      description: "The type of the input field",
    },
    placeholder: {
      control: { type: "text" },
      description: "The placeholder text for the input field",
    },
    modelValue: {
      control: { type: "text" },
      description: "The value of the input field (v-model binding)",
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { Input },
  setup() {
    return { args };
  },
  template: `
    <Input 
      v-bind="args" 
      v-model="args.modelValue" 
    />
    <p>Value: {{ args.modelValue }}</p>
  `,
});

export const Default = Template.bind({});
Default.args = {
  type: "text",
  placeholder: "Enter text",
  modelValue: "",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Enter your password",
  modelValue: "",
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  placeholder: "Enter your email",
  modelValue: "",
};

export const Number = Template.bind({});
Number.args = {
  type: "number",
  placeholder: "Enter a number",
  modelValue: "",
};