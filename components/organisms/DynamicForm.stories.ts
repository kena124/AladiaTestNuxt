import type { Meta, StoryFn } from "@storybook/vue3";
import DynamicForm from "./DynamicForm.vue";
import type { FormSchema } from "~/types/FormSchema";

export default {
  title: "Organisms/DynamicForm",
  component: DynamicForm,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      description: "Defines the structure of the dynamic form, including fields, validations, and conditions.",
    },
    initialData: {
      description: "Initial data for pre-filling the form fields.",
    },
    onSubmit: {
      action: "submit",
      description: "Event emitted when the form is successfully submitted.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `DynamicForm` component renders a dynamic form based on a schema, supports validation, and handles conditional fields.",
      },
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { DynamicForm },
  setup() {
    const handleSubmit = (formData: { [key: string]: any }) => {
      alert("Form Submitted: " + JSON.stringify(formData, null, 2));
    };

    return { args, handleSubmit };
  },
  template: `
    <DynamicForm 
      :schema="args.schema" 
      :initial-data="args.initialData" 
      @submit="handleSubmit" 
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  schema: [
    {
      type: "text",
      label: "First Name",
      model: "firstName",
      placeholder: "Enter your first name",
      validations: [{ rule: "required", message: "First name is required." }],
    },
    {
      type: "text",
      label: "Last Name",
      model: "lastName",
      placeholder: "Enter your last name",
    },
    {
      type: "email",
      label: "Email",
      model: "email",
      placeholder: "Enter your email",
      validations: [
        { rule: "required", message: "Email is required." },
        {
          rule: "pattern",
          value: /^\S+@\S+\.\S+$/,
          message: "Please enter a valid email.",
        },
      ],
    },
    {
      type: "select",
      label: "Favorite Color",
      model: "favoriteColor",
      options: [
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
      ],
    },
    {
      type: "text",
      label: "Secret Code",
      model: "secretCode",
      placeholder: "Enter the secret code",
      conditional: {
        model: "favoriteColor",
        value: "green",
      },
    },
  ] as FormSchema,
  initialData: {
    firstName: "",
    lastName: "",
    email: "",
    favoriteColor: "red",
    secretCode: "",
  },
};

export const PrefilledData = Template.bind({});
PrefilledData.args = {
  schema: Default.args.schema,
  initialData: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    favoriteColor: "blue",
    secretCode: "12345",
  },
};