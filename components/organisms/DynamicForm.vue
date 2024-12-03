<template>
  <form @submit.prevent="handleSubmit" class="dynamic-form">
    <transition-group name="fade" tag="div" class="form-fields">
      <div
        v-for="field in visibleFields"
        :key="field.model"
        class="form-field enhanced-form-field"
      >
        <component
          :is="getComponentType(field.type)"
          v-model="formData[field.model]"
          v-bind="getFieldProps(field)"
          class="form-input enhanced-input"
        ></component>
        <span
          v-if="errors[field.model]"
          class="error-message enhanced-error-message"
        >
          {{ errors[field.model] }}
        </span>
      </div>
      <button
        :disabled="!isFormValid"
        type="submit"
        class="submit-button enhanced-submit-button"
      >
        Submit
      </button>
    </transition-group>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import type { FormSchema, FormField } from "~/types/FormSchema";

// Import custom input components or use base HTML elements
import TextInput from "../atoms/TextInput.vue";
import SelectInput from "../atoms/SelectInput.vue";
import CheckboxInput from "../atoms/CheckboxInput.vue";
import RadioInput from "../atoms/RadioInput.vue";
import DateInput from "../atoms/DateInput.vue";
import TextareaInput from "../atoms/TextareaInput.vue";

export default defineComponent({
  name: "DynamicForm",
  props: {
    schema: {
      type: Array as () => FormSchema,
      required: true,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const formData = ref<{ [key: string]: any }>({ ...props.initialData });
    const errors = ref<{ [key: string]: string }>({});
    const isFormValid = ref(true);

    const visibleFields = computed(() =>
      props.schema.filter((field) => {
        if (!field.conditional) return true;
        const conditionValue = formData.value[field.conditional.model];
        return conditionValue === field.conditional.value;
      })
    );

    watch(
      () => formData.value,
      () => {
        validateForm();
      },
      { deep: true }
    );

    const getComponentType = (type: string) => {
      switch (type) {
        case "text":
        case "email":
        case "password":
          return TextInput;
        case "textarea":
          return TextareaInput;
        case "select":
          return SelectInput;
        case "checkbox":
          return CheckboxInput;
        case "radio":
          return RadioInput;
        case "date":
          return DateInput;
        default:
          return TextInput;
      }
    };

    const getFieldProps = (field: FormField) => ({
      type: field.type,
      label: field.label,
      placeholder: field.placeholder,
      options: field.options,
    });

    const validateField = (field: FormField) => {
      errors.value[field.model] = "";
      if (field.validations) {
        for (const validation of field.validations) {
          const value = formData.value[field.model];
          switch (validation.rule) {
            case "required":
              if (!value) {
                errors.value[field.model] = validation.message;
                return;
              }
              break;
            case "minLength":
              if (value.length < validation.value) {
                errors.value[field.model] = validation.message;
                return;
              }
              break;
          }
        }
      }
    };

    const validateForm = () => {
      isFormValid.value = true;
      for (const field of visibleFields.value) {
        validateField(field);
        if (errors.value[field.model]) {
          isFormValid.value = false;
        }
      }
    };

    const handleSubmit = () => {
      validateForm();
      if (isFormValid.value) {
        emit("submit", formData.value);
      }
    };

    return {
      formData,
      errors,
      isFormValid,
      visibleFields,
      getComponentType,
      getFieldProps,
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/global.scss" as *;

.dynamic-form {
  padding: 2rem;
  background: var(--form-bg-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-lg);
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.enhanced-form-field {
  background: var(--field-bg-color);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  box-shadow: var(--box-shadow-sm);
  transition: transform 0.3s ease;
}

.enhanced-form-field:hover {
  transform: translateY(-5px);
}

.form-label {
  font-weight: bold;
  color: var(--text-color-dark);
}

.enhanced-input {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.enhanced-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light-color);
}

.enhanced-error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.enhanced-submit-button {
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
  padding: 1rem;
  border-radius: var(--border-radius-lg);
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 0.2s ease, background 0.3s ease;
}

.enhanced-submit-button:hover {
  background: var(--primary-dark-color);
  transform: scale(1.05);
}

.enhanced-submit-button:disabled {
  background: var(--disabled-bg-color);
  cursor: not-allowed;
  opacity: 0.6;
}
header {
  margin-bottom: 2em;

  h1 {
    color: #2c3e50;
    font-size: 1.8em;
    font-weight: 600;
    margin: 0;
    position: relative;

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
</style>
