<template>
  <button :class="['btn', `btn--${type}`]" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  type?: "primary" | "secondary";
}>();

const type = props.type || "primary";
</script>

<style scoped lang="scss">
/* Move @use to the very top */
@use "~/assets/styles/tokens.scss" as *;

.btn {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  font-family: $font-family-base;
  cursor: pointer;
}
.btn--primary {
  background-color: $primary-color;
  color: #fff;
}
.btn--secondary {
  background-color: $secondary-color;
  color: #fff;
}
.btn {
  &:hover {
    width: 40px;
  }
}
</style>
