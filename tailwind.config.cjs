/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,ts}",
    "./src/pages/**/*.{astro,html}",
    "./src/components/**/*.{astro,html,js,ts}"
  ],
  safelist: [
    "text-neuro-title",
    "text-neuro-paragraph",
    "bg-neuro-background",
    "bg-neuro-detail",
    "bg-neuro-primaryButton",
    "bg-neuro-secondaryButton",
    "border-neuro-detail"
  ],
  theme: {
    extend: {
      colors: {
        neuro: {
          background: "#F7F4EE",
          detail: "#D3EBF5",
          paragraph: "#82C4CE",
          title: "#42A8AF",
          primaryButton: "#DC692E",
          secondaryButton: "#2C6268"
        }
      },
      borderRadius: {
        "4xl": "48px"
      },
      fontFamily: {
        heading: ["Joyride", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
        body: ["Avenir", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"]
      }
    }
  }
};
