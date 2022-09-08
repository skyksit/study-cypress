const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '65s5d4',
  e2e: {
    // Device Preset iphone-xr
    viewportWidth: 414,
    viewportHeight: 896,
  },
});
