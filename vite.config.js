
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test/setup.js",

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/main.jsx",
        "src/data/**",
        "src/**/*.test.jsx"
      ]
    }
  }
});
