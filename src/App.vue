<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useUserAuth } from "./stores/userAuth";
import { onMounted } from "vue";

const userStore = useUserAuth();
userStore.getStoredUser();

onMounted(() => {
  document.body?.classList.add(localStorage.getItem("mode") || "light");
});
</script>

<template>
  <Header v-if="!$route.meta.auth" />
  <RouterView />
  <Footer v-if="!$route.meta.auth" />
</template>
