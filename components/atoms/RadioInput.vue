<template>
  <div class="radio-input">
    <label v-if="label" class="group-label">{{ label }}</label>
    <div class="radio-group">
      <label
        v-for="option in options"
        :key="option.value"
        :for="getOptionId(option)"
      >
        <input
          type="radio"
          :id="getOptionId(option)"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
          :disabled="disabled"
        />
        <span class="radiomark"></span>
        {{ option.label }}
      </label>
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Option {
  label: string;
  value: any;
}

export default defineComponent({
  name: "RadioInput",
  props: {
    modelValue: [String, Number, Boolean],
    label: String,
    options: {
      type: Array as () => Option[],
      required: true,
    },
    disabled: Boolean,
    name: {
      type: String,
      default: () => `radio-${Math.random().toString(36).substr(2, 9)}`,
    },
    errorMessage: String,
  },
  emits: ["update:modelValue"],
  methods: {
    getOptionId(option: Option) {
      return `${this.name}-${option.value}`;
    },
  },
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/global.scss" as *;

.radio-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  .group-label {
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-weight: bold;
  }

  .radio-group {
    display: flex;
    flex-direction: column;

    label {
      position: relative;
      padding-left: 1.75rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      color: var(--text-color);
      font-family: var(--font-family-base);

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ .radiomark:after {
          display: block;
        }

        &:disabled ~ .radiomark {
          background-color: var(--disabled-bg-color);
          cursor: not-allowed;
        }
      }

      .radiomark {
        position: absolute;
        top: 0;
        left: 0;
        height: 1.25rem;
        width: 1.25rem;
        background-color: var(--input-bg-color);
        border: 1px solid var(--border-color);
        border-radius: 50%;

        &:after {
          content: "";
          position: absolute;
          display: none;
          top: 0.25rem;
          left: 0.25rem;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background: var(--primary-color);
        }
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
