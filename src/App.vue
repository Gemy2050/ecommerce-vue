<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useUserAuth } from "./stores/userAuth";
import { onMounted } from "vue";

const userStore = useUserAuth();
const route = useRoute();

onMounted(() => {
  if (route.meta.requiresAuth) {
    userStore.getStoredUser();
  }
  document.body?.classList.add(localStorage.getItem("mode") || "light");
});
</script>

<template>
  <Header v-if="route.meta.requiresAuth" />
  <RouterView />
  <Footer v-if="route.meta.requiresAuth" />
</template>
