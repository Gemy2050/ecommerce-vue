<script setup lang="ts">
import { MenuSquare, UserCircle2 } from "lucide-vue-next";
import Dropdown from "../ui/Dropdown.vue";
import { useUserAuth } from "@/stores/userAuth";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import ModeToggler from "../ui/ModeToggler.vue";

const userAuth = useUserAuth();
const { user } = storeToRefs(userAuth);

const toggleSidebar = inject("toggleSidebar") as Function;

const actions = [{ label: "Logout", action: userAuth.logout }];
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
      <Dropdown :items="actions" class="mb-[-5px]">
        <UserCircle2 v-if="!user?.image" class="cursor-pointer" />
        <img
          v-else
          :src="user?.image"
          alt="user"
          class="w-10 h-10 rounded-full cursor-pointer"
        />
      </Dropdown>
    </div>
  </div>
</template>
