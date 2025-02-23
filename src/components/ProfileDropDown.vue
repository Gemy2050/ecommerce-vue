<script setup lang="ts">
import Dropdown from "./ui/Dropdown.vue";
import { useUserAuth } from "@/stores/userAuth";
import { User } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const userAuth = useUserAuth();
const { user } = storeToRefs(userAuth);
const router = useRouter();

const actions = [
  { label: "Profile", action: goToProfile },
  { label: "Logout", action: userAuth.logout },
];

function goToProfile() {
  router.push("/profile");
}
</script>

<template>
  <Dropdown :items="actions">
    <User v-if="!user?.image" class="cursor-pointer" />
    <img
      v-else
      :src="user?.image"
      alt="user profile image"
      loading="lazy"
      class="w-9 h-9 rounded-full"
    />
  </Dropdown>
</template>
