<template>
  <div class="select-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="select-wrapper">
      <select
        :id="id"
        :value="modelValue"
        @change="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :disabled="disabled"
      >
        <option value="" disabled hidden>
          {{ placeholder || "Select an option" }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="select-arrow">&#9662;</span>
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

interface Option {
  label: string;
  value: any;
}

export default defineComponent({
  name: "SelectInput",
  props: {
    modelValue: [String, Number, Boolean],
    label: String,
    placeholder: String,
    options: {
      type: Array as () => Option[],
      required: true,
    },
    disabled: Boolean,
    id: {
      type: String,
      default: () => `select-${Math.random().toString(36).substr(2, 9)}`,
    },
    errorMessage: String,
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/global.scss" as *;

.select-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-weight: bold;
  }

  .select-wrapper {
    position: relative;
    display: inline-block;

    select {
      appearance: none;
      width: 100%;
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

    .select-arrow {
      position: absolute;
      top: 50%;
      right: 1rem;
      pointer-events: none;
      transform: translateY(-50%);
      color: var(--input-text-color);
    }
  }

  .error-message {
    color: var(--error-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}
</style>
