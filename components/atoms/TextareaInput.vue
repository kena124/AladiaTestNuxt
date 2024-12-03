<template>
  <div class="textarea-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="textarea-wrapper">
      <textarea
        :id="id"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
      ></textarea>
      <span v-if="icon" class="input-icon">
        <i :class="icon"></i>
      </span>
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextareaInput",
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    rows: {
      type: Number,
      default: 4,
    },
    disabled: Boolean,
    icon: String, // FontAwesome or custom icon class
    id: {
      type: String,
      default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
    },
    errorMessage: String,
  },
  emits: ["update:modelValue"],
});
</script>
<style scoped lang="scss">
@use "~/assets/styles/global.scss" as *;

.textarea-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-weight: bold;
  }

  .textarea-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    textarea {
      flex: 1;
      padding: 0.5rem;
      padding-right: 2.5rem; // Space for the icon
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-base);
      background-color: var(--input-bg-color);
      color: var(--input-text-color);
      font-family: var(--font-family-base);
      resize: vertical;

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

    .input-icon {
      position: absolute;
      right: 0.75rem;
      color: var(--text-color);
      font-size: 1.25rem;
      pointer-events: none; // Ensure the icon doesn't interfere with textarea focus

      i {
        vertical-align: middle;
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
