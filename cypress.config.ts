import { defineConfig } from "cypress";
import plugin from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  env: {
    backendUrl: "http://localhost:8080",
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'C317-tests',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      plugin( on )
    },
  },
});
