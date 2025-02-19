<script setup lang="ts">
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import { provide, ref } from "vue";

const isSidebarOpen = ref(false);

// Provide the state and toggle function of sidebar to child components
provide("isSidebarOpen", isSidebarOpen);
provide("toggleSidebar", () => {
  isSidebarOpen.value = !isSidebarOpen.value;
});
</script>

<template>
  <div id="Dashboard" class="flex !relative">
    <Sidebar />
    <div
      class="pt-[64px] lg:p-0 bg-[#f0f5f8] dark:bg-[#111] overflow-hidden flex-1 min-h-screen max-w-full"
    >
      <Navbar />
      <div class="p-4 xl:container">
        <router-view />
      </div>
    </div>
  </div>
</template>
