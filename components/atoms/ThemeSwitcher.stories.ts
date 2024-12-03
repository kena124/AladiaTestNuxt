import { ref } from "vue";
import type { Meta, StoryFn } from "@storybook/vue3";
import ThemeSwitcher from "./ThemeSwitcher.vue";

export default {
  title: "Atoms/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "Current theme of the application.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "light" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A button component to toggle between light and dark themes.",
      },
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { ThemeSwitcher },
  setup() {
    const theme = ref(args.theme || "light");

    const setTheme = (newTheme: string) => {
      theme.value = newTheme;
      document.documentElement.setAttribute("data-theme", newTheme);
    };

    return { theme, setTheme };
  },
  template: `
    <div :data-theme="theme" style="min-height: 100vh; padding: 1rem;">
      <ThemeSwitcher />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  theme: "light",
};

Default.parameters = {
  docs: {
    description: {
      story: "Default ThemeSwitcher component with the light theme enabled.",
    },
  },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  theme: "dark",
};

DarkTheme.parameters = {
  docs: {
    description: {
      story: "ThemeSwitcher component with the dark theme enabled.",
    },
  },
};