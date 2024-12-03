<!-- components/organisms/LoginForm.vue -->
<template>
  <form @submit.prevent="onSubmit">
    <FormField
      id="email"
      label="Email"
      placeholder="Enter your email"
      v-model="email"
    />
    <FormField
      id="password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      v-model="password"
    />
    <Button type="primary">Login</Button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormField from "../molecules/FormField.vue";
import Button from "../atoms/Button.vue";

const email = ref("");
const password = ref("");

function onSubmit() {
  // Handle form submission
  console.log("Login submitted:", {
    email: email.value,
    password: password.value,
  });
}
</script>

<style scoped lang="scss">
form {
  max-width: 300px;
  margin: auto;
}
</style>
