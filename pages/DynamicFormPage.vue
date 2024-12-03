<template>
  <div class="page-content">
    <!-- Theme Switcher Component -->
    <ThemeSwitcher />
    <h1>Dynamic Form Example</h1>
    <!-- Dynamic Form Component -->
    <DynamicForm :schema="formSchema" @submit="handleFormSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DynamicForm from "~/components/organisms/DynamicForm.vue";
import ThemeSwitcher from "~/components/atoms/ThemeSwitcher.vue";
import type { FormSchema } from "~/types/FormSchema";

export default defineComponent({
  name: "DynamicFormPage",
  components: { DynamicForm, ThemeSwitcher },
  setup() {
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
        icon: "fa-user",
        model: "lastName",
        placeholder: "Enter your last name",
      },
      {
        type: "email",
        label: "Email",
        icon: "fa-envelope",
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
      // Add more fields as needed
    ];

    const handleFormSubmit = (formData: { [key: string]: any }) => {
      console.log("Form Submitted:", formData);
      // Handle form submission (e.g., send data to API)
    };

    return { formSchema, handleFormSubmit };
  },
});
</script>

<style scoped lang="scss">
.page-content {
  padding: 2rem;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;

  h1 {
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 2rem;
    color: var(--primary-color);
  }

  .form-container {
    margin: 2rem auto;
    max-width: 600px;
    padding: 1.5rem;
    background-color: var(--input-bg-color);
    border-radius: var(--border-radius-base);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
</style>
