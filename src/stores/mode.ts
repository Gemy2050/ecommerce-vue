import { defineStore } from "pinia";
import { ref } from "vue";

export const useMode = defineStore("mode", () => {
  const defaultMode = localStorage.getItem("mode") || "light";
  const mode = ref(defaultMode);

  // Function to update the body class
  const updateBodyClass = () => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode.value);
  };

  // Toggle mode function
  const toggleMode = () => {
    mode.value = mode.value === "light" ? "dark" : "light";
    localStorage.setItem("mode", mode.value);
    updateBodyClass();
  };

  const getChartTheme = () => ({
    chart: {
      background: "transparent",
      foreColor: mode.value === "dark" ? "#fff" : "#333",
      toolbar: { show: false },
    },
    colors: ["#f0ac0d"],
    tooltip: {
      theme: mode.value, // "light" or "dark"
    },
  });

  // Apply mode when store initializes
  updateBodyClass();

  return { mode, toggleMode, getChartTheme };
});
