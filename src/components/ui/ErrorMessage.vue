<script setup lang="ts">
const props = defineProps<{
  message?: string;
  class?: string;
}>();
</script>
<template>
  <span :class="`text-red-600 block text-[12px] ${props.class}`">
    {{ message }}
  </span>
</template>
