import "vue3-carousel/carousel.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION, type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import AOS from "aos";
import "aos/dist/aos.css";
import vue3GoogleLogin from "vue3-google-login";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

// QueryClient Config for Vue Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      networkMode: "offlineFirst",
    },
  },
});

// Toastify Config
const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  maxToasts: 1,
  newestOnTop: true,
};

// Initialize AOS
AOS.init({
  offset: 120,
  duration: 900,
  easing: "ease",
  delay: 0,
});

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(Toast, options);
app.use(vue3GoogleLogin, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID });
app.use(VueApexCharts);

app.mount("#app");
