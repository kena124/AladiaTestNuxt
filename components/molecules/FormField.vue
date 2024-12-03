<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <Input :id="id" v-bind="{ type, placeholder }" v-model="modelValue" />
  </div>
</template>

<script setup lang="ts">
import Input from "../atoms/Input.vue";
import { defineProps } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  modelValue?: string;
}>();

const modelValue = props.modelValue || "";
</script>

<style scoped lang="scss">
.form-field {
  margin-bottom: 1em;
}
label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}
</style>
