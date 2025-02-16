<script setup lang="ts">
import { SOCIAL_LINKS } from "@/data/links";
import Logo from "./ui/Logo.vue";
</script>

<template>
  <footer class="bg-[#242424] text-white pt-20 text-center relative overflow-hidden">
    <div class="container relative z-10">
      <div class="flex flex-wrap justify-center items-center">
        <div data-aos="fade-up" class="w-full sm:w-1/2 md:w-1/3 sm:px-5 py-5 md:py-0">
          <h3>
            <Logo class="text-2xl mb-3 !text-white" />
          </h3>
          <p>Platform for Shoes that keep kids feet comfortable all day long.</p>
        </div>
        <div data-aos="fade-up" class="w-full sm:w-1/2 md:w-1/3 sm:px-5 py-5 md:py-0">
          <h4 class="text-[#B3B3B3] mb-5">Mail us at:</h4>
          <p>kidsKiosk@contact.com</p>
        </div>
        <div data-aos="fade-up" class="w-full sm:w-1/2 md:w-1/3 sm:px-5 py-5 md:py-0">
          <h4 class="text-[#B3B3B3] mb-5">Follow Us</h4>
          <div class="flex gap-4 items-center justify-center">
            <a
              v-for="{ name, link, icon } in SOCIAL_LINKS"
              :key="name"
              :href="link"
              target="_blank"
              rel="noopener"
              class="hover:text-primary duration-300"
            >
              <component :is="icon" :size="25" />
            </a>
          </div>
        </div>
      </div>
      <p class="text-center mt-24 pb-10 text-[#B3B3B3]">
        @2024 Kids Kiosk. All rights reserved
      </p>
    </div>

    <div
      className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary !opacity-10 blur-3xl "
      data-aos="fade-right"
    />
    <div
      className="absolute bottom-20 right-0 w-[500px] h-[500px] rounded-full bg-primary !opacity-10 blur-3xl "
      data-aos="fade-left"
    />
  </footer>
</template>
