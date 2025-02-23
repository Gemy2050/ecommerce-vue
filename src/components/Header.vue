<script setup lang="ts">
import { NAV_LINKS } from "@/data/links";
import { RouterLink, useRouter } from "vue-router";
import Logo from "./ui/Logo.vue";
import { Menu, ShoppingCart, X } from "lucide-vue-next";
import { useUserAuth } from "@/stores/userAuth";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useCartStore } from "@/stores/cart";
import ModeToggler from "./ModeToggler.vue";
import ProfileDropDown from "./ProfileDropDown.vue";

const cartStore = useCartStore();
const userAuth = useUserAuth();
const { user } = storeToRefs(userAuth);
const router = useRouter();
const openMenu = ref(false);

function toggleMenu() {
  openMenu.value = !openMenu.value;
}

watch(
  () => router.currentRoute.value.path,
  () => {
    openMenu.value = false;
  }
);
</script>

<template>
  <header class="sticky top-0 z-20 bg-background text-foreground shadow-lg py-4">
    <div class="px-5 lg:px-5 flex items-center justify-between gap-0 lg:gap-8">
      <RouterLink to="/" class="min-w-[25%] md:min-w-[33%] focus:outline-none">
        <Logo class="text-2xl cursor-pointer" />
      </RouterLink>
      <button class="lg:hidden" @click="toggleMenu">
        <Menu :size="30" class="text-primary" />
      </button>
      <div
        :class="`${
          openMenu ? 'left-0' : 'left-[-100%]'
        } fixed overflow-hidden lg:overflow-visible w-[380px] py-8 lg:py-0 h-full max-w-full bg-background top-[64px] z-10 flex-1 lg:static flex flex-col lg:flex-row gap-4 lg:justify-between duration-300 shadow-lg lg:shadow-none`"
      >
        <X
          class="absolute block lg:hidden left-2 top-2 cursor-pointer hover:text-red-500 duration-300"
          @click="toggleMenu"
        />
        <div class="flex-col lg:flex-row flex items-center gap-4">
          <RouterLink
            to="/dashboard/home"
            v-if="user?.role === 'admin'"
            class="relative overflow-hidden font-bold hover:text-primary duration-300"
          >
            Dashboard
          </RouterLink>

          <RouterLink
            v-for="{ name, link } in NAV_LINKS"
            :key="name"
            class="relative overflow-hidden [&.active]:text-primary [&:hover_.effect]:w-full duration-300"
            :to="link"
            active-class="active"
          >
            <span
              class="effect absolute text-primary left-0 w-0 overflow-hidden duration-150 font-bold"
              >{{ name }}</span
            >
            <span class="block font-bold">{{ name }}</span>
          </RouterLink>
        </div>
        <div
          class="flex items-center justify-center gap-4 md:gap-2 lg:gap-4 mt-5 md:mt-0"
        >
          <ModeToggler />
          <ProfileDropDown />

          <RouterLink to="/cart" class="relative">
            <ShoppingCart :size="30" class="text-g-500 cursor-pointer" />
            <span
              class="absolute text-xs w-5 h-5 rounded-full flex items-center justify-center bg-destructive text-white top-[-13px] left-[9px]"
            >
              {{ cartStore.cart.length }}
            </span>
          </RouterLink>
        </div>
        <div
          className="lg:hidden -z-10 absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-primary !opacity-10 blur-3xl "
          data-aos="fade-right"
        />
        <div
          className="lg:hidden -z-10 absolute bottom-20 right-0 w-[200px] h-[200px] rounded-full bg-primary !opacity-10 blur-3xl "
          data-aos="fade-left"
        />
      </div>
    </div>
  </header>
</template>
