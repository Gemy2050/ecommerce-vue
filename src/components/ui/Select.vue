<template>
  <select v-bind="$attrs" :class="computedClass" v-model="selectedValue">
    <slot></slot>
  </select>
</template>

<script setup lang="ts">
import { computed, defineProps, defineModel } from "vue";

// Define model (no need for emits)
const selectedValue = defineModel();

// Props
const props = defineProps({
  className: { type: String, default: "" },
});

// Compute class dynamically
const computedClass = computed(
  () =>
    `text-[15px] h-[44.5px] p-[10px] outline-none shadow-md border bg-background 
  border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg 
  w-full duration-300 ${props.className}`
);
</script>
