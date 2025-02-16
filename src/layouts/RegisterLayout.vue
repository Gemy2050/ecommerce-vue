<script setup lang="ts">
import RegisterHeader from "@/components/register/RegisterHeader.vue";
import Logo from "@/components/ui/Logo.vue";
</script>

<template>
  <section class="min-h-screen flex flex-col">
    <RegisterHeader />
    <main class="relative container pt-8 pb-3 h-full">
      <h2
        class="text-[28px] sm:text-[40px] text-center md:text-start !font-semibold mb-8"
        data-aos="fade-right"
      >
        Welcome to <Logo />
      </h2>
      <slot />
    </main>
    <img
      src="/imgs/circle.svg"
      class="hidden md:block w-[120px] fixed top-32 right-0 z-[-1]"
      alt="circle"
      width="{120}"
      height="{185}"
      loading="eager"
      data-aos="fade-left"
    />
    <img
      src="/imgs/square.svg"
      class="hidden md:block md:w-[200px] fixed bottom-0 right-0 z-[-1]"
      alt="square shape"
      width="{200}"
      height="{215}"
      loading="eager"
      data-aos="fade-left"
    />
  </section>
</template>
