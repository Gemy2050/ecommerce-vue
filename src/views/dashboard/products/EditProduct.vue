<script setup lang="ts">
import ProductsForm from "@/components/dashboard/ProductsForm.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import { CornerUpRight } from "lucide-vue-next";

import { RouterLink, useRouter } from "vue-router";

import { computed, watchEffect } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { IProduct } from "@/interfaces";
import { axiosInstance } from "@/config/axios.config";
import { useProdutsStore } from "@/stores/products";
import Loader from "@/components/ui/Loader.vue";

const router = useRouter();
const productsStore = useProdutsStore();
const productId = router.currentRoute.value.params.id as string;
const productFound = computed(() =>
  productsStore.products.find((product) => product.id === productId)
);

const queryKey = computed(() => ["getProduct", productId]);
const { data, isLoading, error } = useQuery<IProduct>({
  queryKey,
  queryFn: async () =>
    (await axiosInstance.get(`/product/get-product?id=${productId}`)).data,
  enabled: !productFound.value,
});

const product = computed(() => {
  return productFound.value || data.value;
});

watchEffect(() => {
  if (!productId || error.value) {
    router.push("/dashboard/products");
  }
});
</script>

<template>
  <Loader v-if="isLoading" />
  <main className="p-0" v-else>
    <PageTitle>
      <h2 className="text-lg sm:text-2xl">Edit Product</h2>
      <RouterLink to="..">
        <CornerUpRight :size="40" />
      </RouterLink>
    </PageTitle>

    <ProductsForm :product="product" />
  </main>
</template>
