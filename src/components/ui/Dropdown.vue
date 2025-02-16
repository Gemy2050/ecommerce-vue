<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

interface IITems {
  label: string;
  action: () => void;
}

defineProps<{
  items: IITems[];
}>();
</script>

<template>
  <div class="text-right">
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton
        class="inline-flex w-full justify-center rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <slot />
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-40 border origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-background shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem
              v-for="(item, index) in items"
              :key="index"
              v-slot="{ active }"
            >
              <button
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold dark:text-white',
                ]"
                @click="item.action"
              >
                {{ item.label }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
