<script setup lang="ts">
import { RouterLink } from "vue-router";
import Logo from "../ui/Logo.vue";
</script>

<template>
  <header
    class="sticky top-0 z-20 bg-background text-foreground py-[17px] border-b border-border"
  >
    <div class="container flex justify-between items-center">
      <RouterLink to="/">
        <Logo class="text-[20px] sm:text-2xl" />
      </RouterLink>
      <div>
        <div v-if="$route.path === '/login'" class="text-foreground">
          No account?
          <RouterLink to="/signup" class="text-primary font-bold"> Sign up </RouterLink>
        </div>
        <div v-else>
          Have an account?
          <RouterLink to="/login" class="text-primary font-bold"> Login </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
