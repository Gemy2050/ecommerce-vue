<script setup lang="ts">
import Button from "../ui/Button.vue";
import ColorBox from "./ColorBox.vue";
import type { Colors, IProduct } from "@/interfaces";
import FormUtils from "@/components/dashboard/FormUtils.vue";
import { ProductsForm } from "@/data/forms";
import { useCategories } from "@/hooks/useCategories";
import Loader from "../ui/Loader.vue";
import { useProducts } from "@/hooks/useProducts";
import Popup from "../ui/Popup.vue";
import { getImageURL } from "@/utils/functions";
import { watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  product?: IProduct;
}>();

const {
  categoriesQuery: { data: categories, isLoading },
} = useCategories();

const {
  formMethods,
  handleAddProduct,
  handleEditProduct,
  addNewColorBox,
  disabled,
} = useProducts();

const { values: productForm, handleSubmit, resetForm, setValues } = formMethods;
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  const productId = router.currentRoute.value.params.id as string;

  if (productId) {
    const result = await handleEditProduct(productId, values);
    if (result) router.push("/dashboard/products");
    return;
  }

  const result = await handleAddProduct(values);
  if (result) resetForm();
});

watch(
  () => props.product,
  (product) => {
    if (product) {
      setValues({
        ...product!,
        colors: product.variants,
        hasDiscount: product.hasDiscount ? "Yes" : "No",
        discount: product.priceBeforeDiscount - product.price,
      } as any);
    }
  },
  { immediate: true }
);
</script>

<template>
  <Loader v-if="isLoading" />

  <form
    v-else
    @submit.prevent="onSubmit"
    class="mt-2 p-5 pt-7 rounded-lg bg-background"
  >
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8"
      data-aos="fade-up"
    >
      <FormUtils
        v-for="(field, idx) in ProductsForm"
        :key="idx"
        :field="field"
        :formValues="productForm"
        :dynamicOptions="categories"
        :formMethods="formMethods"
      />
    </div>

    <div className="my-8" data-aos="fade-up">
      <div className="mb-3 flex items-center gap-x-2">
        <h3 className="text-2xl text-gray-400">Product Colors:</h3>
        <Button
          type="button"
          rounded="full"
          class="text-xl font-bold w-8 h-8"
          @click="addNewColorBox"
        >
          +
        </Button>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8"
      >
        <ColorBox
          v-for="(el, idx) in productForm.colors"
          :key="Date.now()"
          :index="idx"
          :colorId="el.id as string"
          :colors="productForm.colors as Colors[]"
          :formMethods="formMethods"
        />
      </div>
    </div>

    <Button
      size="lg"
      rounded="md"
      class="mt-10 text-base font-bold min-w-[180px]"
      type="submit"
      :disabled="disabled"
    >
      Submit
    </Button>
    <Popup>
      <img
        :src="getImageURL((productForm.image || productForm.imageUrl) as string|File)"
        alt="user image"
      />
    </Popup>
  </form>
</template>
