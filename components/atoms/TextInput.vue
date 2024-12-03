<template>
  <div class="text-input">
    <label v-if="label">{{ label }}</label>
    <span v-if="icon" :class="['input-icon', icon]">icons</span>
    <input
      :type="type"
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
  name: "TextInput",
  props: {
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    disabled: Boolean,
    icon: String,
    errorMessage: String,
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped lang="scss">
// @use "~/assets/styles/g÷lobal.scss" as *;
.text-input {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
  .input-icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: red;
  }
  .error-message {
    color: red;
  }

  input {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-base);
    background-color: var(--input-bg-color);
    color: var(--input-text-color);

    &:focus {
      border-color: var(--primary-color);
    }
  }
}
</style>
