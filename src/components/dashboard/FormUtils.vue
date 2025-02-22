<template>
  <InputGroup v-if="field.type === 'select'">
    <label :for="field.name">{{ field.label }}</label>
    <Select
      :id="field.name"
      v-model="modelValue().value"
      class="border p-2 rounded w-full"
    >
      <option v-if="!field.defaultValue" value="">Select an option</option>
      <option
        v-for="option in options"
        :key="typeof option === 'string' ? option : option.id"
        :value="typeof option === 'string' ? option : option.id.toString()"
      >
        {{ typeof option === "string" ? option : option.name }}
      </option>
    </Select>
  </InputGroup>

  <InputGroup v-else-if="field.type === 'editor'" class="!col-span-full">
    <label
      :for="field.name"
      class="absolute z-20 px-2 left-4 -top-3 text-sm text-gray-500 bg-background"
    >
      {{ field.label }}
    </label>
    <TinyEditor v-model="modelValue().value" />
  </InputGroup>

  <!-- Default Input Fields -->
  <InputGroup
    v-else-if="field.name !== 'discount' || shouldRender"
    :file="field.name === 'image' ? modelValue().value as File : null"
    :imgUrl="field.name === 'image' ? formValues.imageUrl : ''"
    @clear="handleClearImage"
  >
    <label :for="field.name">{{ field.label }}</label>
    <Input
      :type="field.type"
      :id="field.name"
      v-model="modelValue().value"
      :placeholder="field.placeholder"
      class="border p-2 rounded w-full"
      v-bind="field.type === 'file' ? { accept: 'image/*' } : {}"
    />
  </InputGroup>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

import InputGroup from "@/components/ui/InputGroup.vue";
import TinyEditor from "@/components/ui/TinyEditor.vue";
import Select from "@/components/ui/Select.vue";
import Input from "@/components/ui/Input.vue";
import { useProductForm } from "@/hooks/useProductForm";
import type { ProductFormSchema } from "@/validation";
import type { IProductsForm } from "@/interfaces";

// Props
interface IProps {
  field: IProductsForm;
  formValues: ProductFormSchema;
  formMethods: ReturnType<typeof useProductForm>;
  dynamicOptions?: { id: string | number; name: string }[]; // Generalized for any dynamic data
}

const props = defineProps<IProps>();

const modelValue = () => {
  return props.formMethods.defineField(props.field.name as keyof ProductFormSchema)[0];
};

const handleClearImage = () => {
  props.formMethods.defineField("image")[0].value = "";
};

// Computed property for select options
const options = computed(() =>
  props.field?.isDynamicOptions ? props.dynamicOptions : props.field.options
);

// Watch `hasDiscount` to conditionally render discount field
const shouldRender = computed(() => {
  return props.field.name === "discount" && props.formValues.hasDiscount === "Yes";
});
</script>
