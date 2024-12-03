<template>
  <el-button :type="type" @click="$emit('click')">
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type?: "primary" | "success" | "warning" | "danger" | "info" | "text";
}>();

const type = computed(() => props.type || "primary");
</script>
