<template>
  <div class="checkbox-input">
    <label :for="id">
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @change="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :disabled="disabled"
      />
      <span class="checkmark"></span>
      {{ label }}
    </label>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckboxInput",
  props: {
    modelValue: Boolean,
    label: String,
    disabled: Boolean,
    id: {
      type: String,
      default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`,
    },
    errorMessage: String,
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/global.scss" as *;

.checkbox-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    position: relative;
    padding-left: 1.75rem;
    cursor: pointer;
    color: var(--text-color);
    font-family: var(--font-family-base);

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark:after {
        display: block;
      }

      &:disabled ~ .checkmark {
        background-color: var(--disabled-bg-color);
        cursor: not-allowed;
      }
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 1.25rem;
      width: 1.25rem;
      background-color: var(--input-bg-color);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-base);

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 0.4rem;
        top: 0.1rem;
        width: 0.25rem;
        height: 0.6rem;
        border: solid var(--primary-color);
        border-width: 0 0.2rem 0.2rem 0;
        transform: rotate(45deg);
      }
    }
  }

  .error-message {
    color: var(--error-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}
</style>
