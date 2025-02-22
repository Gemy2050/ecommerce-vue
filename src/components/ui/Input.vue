<script setup lang="ts">
const modelValue = defineModel();

interface IInput {
  class?: string;
  type: string;
}
const props = defineProps<IInput>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  modelValue.value = props.type === "file" ? target.files?.[0] : target.value;
};
</script>

<template>
  <input
    :type="type"
    :class="`text-[15px] p-[10px] bg-background outline-none shadow-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg w-full duration-300 ${props.class}`"
    v-bind="$attrs"
    :value="type === 'file' ? undefined : modelValue || ''"
    @input="handleInput"
  />
</template>
