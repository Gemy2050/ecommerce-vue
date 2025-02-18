<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { Home } from "lucide-vue-next";
</script>
<template>
  <div
    class="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden"
  >
    <div
      class="relative z-10 text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1
        class="text-9xl font-bold text-primary"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        404
      </h1>

      <p
        class="mt-4 mb-3 text-2xl text-muted-foreground"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Oops! Page not found
      </p>

      <Button
        as="link"
        to="/"
        rounded="md"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <Home class="w-5 h-5" />
        Back to Home
      </Button>
    </div>

    <div
      class="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-primary !opacity-10 blur-3xl animate-pulse"
      data-aos="fade-right"
    />
    <div
      class="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-primary !opacity-15 blur-3xl animate-pulse"
      data-aos="fade-left"
    />
  </div>
</template>
