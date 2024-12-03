<template>
  <AuthTemplate title="Login Page">
    <DynamicForm :schema="formSchema" @submit="handleLogin" />
  </AuthTemplate>
</template>

<script setup lang="ts">
import AuthTemplate from "~/components/templates/AuthTemplate.vue";
import LoginForm from "~/components/organisms/LoginForm.vue";
import type { FormSchema } from "~/types/FormSchema";
import DynamicForm from "~/components/organisms/DynamicForm.vue";
import ThemeSwitcher from "~/components/atoms/ThemeSwitcher.vue";

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

function handleLogin(credentials: { email: string; password: string }) {
  // Handle login logic
  console.log("Logging in with:", credentials);
}
</script>
