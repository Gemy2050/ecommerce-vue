<script setup lang="ts">
import { Eye, Trash2 } from "lucide-vue-next";

const props = defineProps<{
  file?: File | null;
  imgUrl?: string;
}>();
const emit = defineEmits(["clear"]);

const handleClearFile = () => {
  const input = document.querySelector(
    "input[type='file']"
  ) as HTMLInputElement;
  input.value = "";
  emit("clear");
};

const openPopup = () => {
  document.querySelector("#Popup")?.classList.add("open");
  document.body.style.overflow = "hidden";
};
</script>

<template>
  <div
    class="bg-background w-[98%] h-[85%] ps-2 p-1 absolute justify-between space-x-2 right-[1%] top-1/2 -translate-y-1/2 z-10 flex items-center"
  >
    <span class="line-clamp-1 text-ellipsis">
      {{ file && typeof file === "object" ? file.name : "image" }}
    </span>
    <div class="h-full flex items-center space-x-2">
      <Eye :size="22" class="text-gray-500 cursor-pointer" @click="openPopup" />
      <Trash2
        :size="18"
        class="text-red-500 cursor-pointer"
        id="clearImage"
        @click="handleClearFile"
      />
    </div>
  </div>
</template>
