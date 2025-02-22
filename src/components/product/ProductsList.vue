<script setup lang="ts">
import type { IProduct, IQuery } from "@/interfaces";
import Product from "@/components/product/Product.vue";
import { useQuery } from "@tanstack/vue-query";
import ProductSkeleton from "./ProductSkeleton.vue";
import { useProdutsStore } from "@/stores/products";
import { axiosInstance } from "@/config/axios.config";
import Pagination from "../ui/Pagination.vue";
import { computed, ref, useTemplateRef } from "vue";

const productsStore = useProdutsStore();
const pageIndex = ref(1);
const PAGE_SIZE = 12;
const productsRef = useTemplateRef<HTMLElement>("ProuctsSection");
const queryKey = computed(() => ["get-products", pageIndex.value]);

const { data, isLoading } = useQuery<IQuery<IProduct>>({
  queryKey,
  queryFn: async () => {
    const { data } = await axiosInstance.get(
      `/product/get-all-products?pageIndex=${pageIndex.value}&pageSize=${PAGE_SIZE}`
    );
    productsStore.setProducts(data.data);
    return data;
  },
});

function handlePageIndexChange(index: number) {
  pageIndex.value = index;
}
</script>
<template>
  <main class="container mt-20 my-16" ref="ProuctsSection">
    <h2 class="text-primary mb-5">Our Products</h2>
    <div
      class="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center"
    >
      <Product
        v-if="data"
        v-for="product in data.data"
        :key="product.id"
        :product="product"
      />

      <ProductSkeleton v-if="isLoading" />
    </div>
    <Pagination
      :data="data"
      :pageIndex="pageIndex"
      :scroll-to-top="productsRef"
      @pageIndexChange="handlePageIndexChange"
    />
  </main>
</template>
