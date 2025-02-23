<script setup lang="ts">
import { MenuSquare } from "lucide-vue-next";
import { inject } from "vue";
import ModeToggler from "../ModeToggler.vue";
import ProfileDropDown from "../ProfileDropDown.vue";

const toggleSidebar = inject("toggleSidebar") as Function;
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 lg:static z-30 flex items-center shadow-lg bg-background py-2 px-4"
  >
    <MenuSquare
      class="block lg:hidden cursor-pointer hover:text-primary duration-200"
      :size="24"
      @click="toggleSidebar()"
    />

    <div class="flex items-center gap-2 ms-auto">
      <ModeToggler />
      <ProfileDropDown />
    </div>
  </div>
</template>
