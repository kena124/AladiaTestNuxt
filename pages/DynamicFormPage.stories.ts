import { ref } from "vue";
import type { Meta, StoryFn } from "@storybook/vue3";
import DynamicFormPage from "./DynamicFormPage.vue";
import type { FormSchema } from "~/types/FormSchema";

export default {
  title: "Pages/DynamicFormPage",
  component: DynamicFormPage,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "Toggle between light and dark themes.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "light" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The `DynamicFormPage` component contains a dynamic form with validation and conditional fields, along with a theme switcher.",
      },
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { DynamicFormPage },
  setup() {
    // Reactive theme binding
    const theme = ref(args.theme || "light");

    // Sample form schema
    const formSchema: FormSchema = [
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
    ];

    // Form submission handler
    const handleFormSubmit = (formData: { [key: string]: any }) => {
      alert("Form Submitted: " + JSON.stringify(formData, null, 2));
    };

    // Theme change handler
    const setTheme = (newTheme: string) => {
      theme.value = newTheme;
      document.documentElement.setAttribute("data-theme", newTheme);
    };

    return { theme, setTheme, formSchema, handleFormSubmit };
  },
  template: `
  <div :data-theme="theme" style="min-height: 100vh;">
    <DynamicFormPage 
      :schema="formSchema" 
      @submit="handleFormSubmit" 
    />
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  theme: "light",
};

Default.parameters = {
  docs: {
    description: {
      story: "The default story demonstrates the `DynamicFormPage` with the light theme.",
    },
  },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  theme: "dark",
};

DarkTheme.parameters = {
  docs: {
    description: {
      story: "This story demonstrates the `DynamicFormPage` with the dark theme.",
    },
  },
};