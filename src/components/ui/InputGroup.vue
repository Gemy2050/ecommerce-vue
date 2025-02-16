<script setup lang="ts">
import FileInputButtons from "@/components/ui/FileInputButtons.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  class?: string;
  imgUrl?: string;
  file?: File | null;
}>();

const emit = defineEmits(["clear"]);

const imgUrl = ref(props.imgUrl);
const file = ref(props.file);

watch(
  () => props.file,
  (newVal) => {
    file.value = newVal;
  }
);

const handleClear = () => {
  imgUrl.value = "";
  file.value = null;
  emit("clear");
};
</script>

<template>
  <div :class="`relative ${props.class || ''}`" id="input-group">
    <slot />
    <FileInputButtons v-if="file || imgUrl" :file="file" @clear="handleClear" />
  </div>
</template>
