<script setup lang="ts">
import { useMode } from "@/stores/mode";
import { Moon, Sun } from "lucide-vue-next";

const modeStore = useMode();
</script>

<template>
  <div>
    <Sun
      @click="modeStore.toggleMode"
      :class="`${
        modeStore.mode == 'dark' ? 'scale-100' : 'scale-0  w-0 h-0'
      } cursor-pointer duration-300`"
      :size="24"
    />
    <Moon
      @click="modeStore.toggleMode"
      :class="`${
        modeStore.mode == 'dark' ? 'scale-0 w-0 h-0' : 'scale-100'
      } cursor-pointer duration-300`"
      :size="24"
    />
  </div>
</template>
