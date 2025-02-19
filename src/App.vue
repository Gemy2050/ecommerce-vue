<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useUserAuth } from "./stores/userAuth";
import { onMounted } from "vue";
import { useMode } from "./stores/mode";

const userStore = useUserAuth();
const route = useRoute();
onMounted(() => {
  useMode();
  userStore.getStoredUser();
});
</script>

<template>
  <Header v-if="route.meta.requiresAuth" />
  <RouterView />
  <Footer v-if="route.meta.requiresAuth" />
</template>
