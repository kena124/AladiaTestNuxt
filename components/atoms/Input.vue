<template>
  <input :type="type" :placeholder="placeholder" @input="onInput" />
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: string;
  placeholder?: string;
  modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const type = props.type || "text";
const placeholder = props.placeholder || "";

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/tokens.scss" as *;

input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: $font-family-base;
}
</style>
