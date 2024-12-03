<template>
  <div class="auth-template">
    <div class="auth-card">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <main class="auth-content">
        <DynamicForm :schema="formSchema" @submit="handleLogin" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { FormSchema } from "~/types/FormSchema";
import DynamicForm from "~/components/organisms/DynamicForm.vue";

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
];

const props = defineProps<{
  title?: string;
}>();

function handleLogin(credentials: { email: string; password: string }) {
  console.log("Logging in with:", credentials);
}

const title = props.title || "Welcome";
</script>

<style scoped lang="scss">
.auth-template {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1em;

  @media (max-width: 768px) {
    padding: 1em;
  }
}

.auth-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 2.5em;
  width: 100%;
  max-width: 480px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5em;
    max-width: 90%;
  }

  &:hover {
    transform: translateY(-5px);
  }

  header {
    margin-bottom: 2em;

    h1 {
      color: #2c3e50;
      font-size: 1.8em;
      font-weight: 600;
      text-align: center;

      @media (max-width: 768px) {
        font-size: 1.5em;
      }

      &::after {
        content: "";
        display: block;
        width: 50px;
        height: 3px;
        background: #3498db;
        margin: 0.5em auto;
        border-radius: 2px;
      }
    }
  }
}

.auth-content {
  :deep(input) {
    width: 100%;
    padding: 12px;
    margin-bottom: 1em;
    border: 1px solid #e1e1e1;
    border-radius: 6px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }

  :deep(button) {
    width: 100%;
    padding: 12px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #2980b9;
    }

    @media (max-width: 768px) {
      padding: 10px;
      font-size: 0.9em;
    }
  }
}
</style>
