<script setup lang="ts">
import Login from "@/components/register/Login.vue";
import Signup from "@/components/register/Signup.vue";
import RegisterLayout from "@/layouts/RegisterLayout.vue";
</script>

<template>
  <RegisterLayout>
    <Login v-if="$route.path === '/login'" />
    <Signup v-else />
  </RegisterLayout>
</template>
