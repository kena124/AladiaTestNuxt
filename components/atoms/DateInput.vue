<template>
  <div class="date-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      type="date"
      :id="id"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DateInput",
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    disabled: Boolean,
    id: {
      type: String,
      default: () => `date-${Math.random().toString(36).substr(2, 9)}`,
    },
    errorMessage: String,
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/global.scss" as *;

.date-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-base);
    background-color: var(--input-bg-color);
    color: var(--input-text-color);
    font-family: var(--font-family-base);

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }

    &:disabled {
      background-color: var(--disabled-bg-color);
      cursor: not-allowed;
    }
  }

  .error-message {
    color: var(--error-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}
</style>
