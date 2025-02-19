<script setup lang="ts">
import { RouterLink } from "vue-router";
import Logo from "../ui/Logo.vue";
import { computed, inject, watchEffect } from "vue";
import { SIDEBAR_LINKS } from "@/data/links";
import { storeToRefs } from "pinia";
import { useUserAuth } from "@/stores/userAuth";
import { UserCircle2 } from "lucide-vue-next";

const userAuth = useUserAuth();
const { user } = storeToRefs(userAuth);

const isSidebarOpen = inject("isSidebarOpen");

const handleActiveLink = (isActive: boolean, path: string) => {
  const isMatchingPath = location.pathname.startsWith("/dashboard" + path);
  return `${
    isActive || isMatchingPath
      ? "border-primary !text-primary font-bold"
      : "border-transparent "
  } flex gap-2 items-center p-3 block text-gray-800 dark:text-gray-300 border-e-4 hover:ps-4 hover:border-primary active:border-primary duration-300`;
};
</script>

<template>
  <div
    id="Sidebar"
    :class="`${
      !isSidebarOpen ? 'sidebar-hidden' : ''
    } flex flex-col flex-shrink-0 w-[200px] bg-background text-foreground py-4 lg:h-screen shadow-2xl fixed top-[64px] lg:sticky lg:top-0 bottom-0 left-0 z-30 duration-200`"
  >
    <RouterLink to="/">
      <Logo class="text-2xl px-3" />
    </RouterLink>

    <ul class="flex flex-col mt-4">
      <li
        v-for="{ link, name, icon } in SIDEBAR_LINKS"
        key="{name}"
        class="border-b border-gray-200 dark:border-b-gray-600"
      >
        <RouterLink
          :to="`/dashboard${link}`"
          active-class="active"
          :class="handleActiveLink(false, link)"
        >
          <component :is="icon" :size="22" />
          {{ name }}
        </RouterLink>
      </li>
    </ul>
    <div class="mt-auto w-full flex justify-center items-center gap-2 ms-auto">
      <div>
        <UserCircle2 v-if="!user?.image" />
        <div class="flex items-center gap-2">
          <img :src="user?.image" alt="user" class="w-10 h-10 rounded-full" />
          <div>
            <p class="text-xs font-medium">
              {{ user?.firstName }} {{ user?.secondName }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              @{{ user?.email.slice(0, user?.email.indexOf("@")) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
