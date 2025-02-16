<script setup lang="ts">
import { X } from "lucide-vue-next";

const hidePopup = () => {
  document.querySelector("#Popup")?.classList.remove("open");
  document.body.style.overflow = "auto";
};
</script>

<template>
  <div
    id="Popup"
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 backdrop-blur-md z-50 scale-0 transition-transform duration-300"
  >
    <X
      :size="30"
      class="text-red-600 cursor-pointer absolute top-3 left-3 z-20"
      @click="hidePopup"
    />

    <div
      class="absolute w-[90%] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <slot />
    </div>
  </div>
</template>
