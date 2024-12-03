<template>
  <button @click="toggleTheme" class="theme-switcher">
    Switch to {{ theme === "light" ? "Dark" : "Light" }} Theme
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "ThemeSwitcher",
  setup() {
    const theme = ref("light");

    const setTheme = (newTheme: string) => {
      theme.value = newTheme;
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };

    const toggleTheme = () => {
      setTheme(theme.value === "light" ? "dark" : "light");
    };

    onMounted(() => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    });

    return { theme, toggleTheme };
  },
});
</script>

<style scoped lang="scss">
.theme-switcher {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: var(--button-text-color);
  background-color: var(--button-bg-color);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-base);
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--button-hover-bg-color);
    color: var(--button-text-color);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
