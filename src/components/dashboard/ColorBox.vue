<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Trash2 } from "lucide-vue-next";
import Button from "../ui/Button.vue";
import InputGroup from "../ui/InputGroup.vue";
import Input from "../ui/Input.vue";
import { useProductForm } from "@/hooks/useProductForm";

// Define props
interface IProps {
  colorId: number | string;
  index: number;
  formMethods: ReturnType<typeof useProductForm>;
}

const props = defineProps<IProps>();

// Extract `defineField` from form methods
const { defineField, isSubmitting } = props.formMethods;

// Define field for this specific color
const [colorValue] = defineField(`colors.${props.index}.color`);

// Computed property for current color
const currentColor = computed(
  () => props.formMethods.values.colors?.[props.index]
);

// Methods
const addSize = () => {
  if (!currentColor.value) return;
  props.formMethods.setFieldValue(`colors.${props.index}.sizes`, [
    ...(props.formMethods.values.colors?.[props.index].sizes || []),
    { id: Date.now(), size: "", quantity: "" },
  ]);
};

const removeColor = () => {
  const updatedColors =
    props.formMethods.values.colors?.filter((el) => el.id !== props.colorId) ||
    [];

  props.formMethods.setFieldValue("colors", updatedColors);
};

const removeSize = (sizeIndex: number) => {
  const updatedSizes = [
    ...(props.formMethods.values.colors?.[props.index].sizes || []),
  ];
  updatedSizes.splice(sizeIndex, 1);
  props.formMethods.setFieldValue(`colors.${props.index}.sizes`, updatedSizes);
};
</script>

<template>
  <div class="rounded-md flex flex-col items-center">
    <div
      class="w-full border-2 border-gray-200 dark:border-gray-400 max-w-md p-4 pt-6 bg-background rounded-lg shadow-lg mb-2"
    >
      <!-- Color Name Input -->
      <div class="flex gap-2 items-center justify-between mb-6">
        <InputGroup class="w-full">
          <label :for="`colorName-${colorId}`">Color Name</label>
          <Input
            type="text"
            :id="`colorName-${colorId}`"
            v-model="colorValue"
          />
        </InputGroup>
        <button
          type="button"
          class="text-red-500 text-xl"
          v-if="formMethods.values.colors?.length !== 1"
          @click="removeColor"
        >
          <Trash2 :size="22" />
        </button>
      </div>

      <!-- Sizes and Quantities -->
      <div
        v-for="(size, idx) in currentColor?.sizes"
        :key="size.id"
        class="flex gap-2 mb-5"
      >
        <InputGroup class="w-1/2">
          <label :for="`size-${size.id}`">Size</label>
          <Input type="text" :id="`size-${size.id}`" v-model="size.size" />
        </InputGroup>
        <InputGroup class="w-1/2">
          <label :for="`quantity-${size.id}`">Quantity</label>
          <Input
            type="number"
            :id="`quantity-${size.id}`"
            v-model="size.quantity"
          />
        </InputGroup>
        <button
          type="button"
          class="text-red-500 text-xl !p-0"
          v-if="currentColor?.sizes?.length !== 1"
          @click="removeSize(idx)"
        >
          <Trash2 :size="18" class="ms-1" />
        </button>
      </div>

      <!-- Add Size Button -->
      <Button
        type="button"
        class="mt-3"
        fullWidth
        rounded="md"
        size="sm"
        :disabled="isSubmitting"
        hideLoader
        @click="addSize"
      >
        + Add Size
      </Button>
    </div>
  </div>
</template>
