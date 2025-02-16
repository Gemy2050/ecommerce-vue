<script setup lang="ts">
const modelValue = defineModel();

interface IInput {
  class?: string;
}
const props = defineProps<IInput>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  modelValue.value = target.value;
};
</script>

<template>
  <textarea
    :class="`text-[15px] p-[10px] bg-background outline-none shadow-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg w-full duration-300 ${props.class}`"
    v-bind="$attrs"
    :value="modelValue as string"
    @input="handleInput"
  ></textarea>
</template>
