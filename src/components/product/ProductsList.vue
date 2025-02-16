<script setup lang="ts">
import type { IProduct } from "@/interfaces";
import Product from "@/components/product/Product.vue";
import { useQuery } from "@tanstack/vue-query";
import ProductSkeleton from "./ProductSkeleton.vue";
import { useProdutsStore } from "@/stores/products";
import { axiosInstance } from "@/config/axios.config";

const productsStore = useProdutsStore();

const { data, isLoading } = useQuery<IProduct[]>({
  queryKey: ["get-products"],
  queryFn: async () => {
    const { data } = await axiosInstance.get("/product/get-all-products");
    productsStore.setProducts(data.data);
    return data.data;
  },
});
</script>
<template>
  <div class="container my-16">
    <h2 class="text-primary mb-5">Our Products</h2>
    <div
      class="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center"
    >
      <Product
        v-if="!isLoading"
        v-for="product in data"
        :key="product.id"
        :product="product"
      />
      <ProductSkeleton v-else />
    </div>
  </div>
</template>
