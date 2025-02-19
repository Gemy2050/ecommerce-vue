<template>
  <!-- Trigger Slot -->
  <slot name="trigger" @click="openModal" v-bind="{ openModal }" />
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog :open="isOpen" @close="closeModal" class="z-10" :title="title">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 z-30" />
      </TransitionChild>

      <div class="fixed inset-0 z-50">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="dialog-scroll relative w-[700px] max-w-full transform overflow-y-scroll max-h-[600px] bg-background text-foreground rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
            >
              <X
                class="absolute top-2 right-2 cursor-pointer hover:text-red-500"
                :size="20"
                @click="closeModal"
              />
              <DialogTitle as="h3" class="text-lg font-medium leading-6">
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-400" v-if="description">
                  {{ description }}
                </p>
              </div>

              <!-- Default Slot -->
              <slot />

              <div class="mt-4 flex gap-4" v-if="action">
                <button
                  type="button"
                  class="inline-flex w-[90px] justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="inline-flex w-[90px] justify-center rounded-md border border-transparent bg-red-500 hover:bg-red-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="handleAction"
                >
                  Confirm!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { X } from "lucide-vue-next";

interface DialogProps {
  title: string;
  description?: string;
  action?: () => void;
}

const props = withDefaults(defineProps<DialogProps>(), {
  description: "",
});

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
  document.body.style.overflow = "auto";
}
function openModal() {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
}

function handleAction() {
  props.action?.();
  closeModal();
}
</script>
