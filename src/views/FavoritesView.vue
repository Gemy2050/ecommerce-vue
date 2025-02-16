<script setup lang="ts">
import Product from "@/components/product/Product.vue";
import { useFavoritesStore } from "@/stores/favorites";
import { Heart, Package } from "lucide-vue-next";

const favoritesStore = useFavoritesStore();
</script>
<template>
  <main class="relative pt-24 pb-20">
    <img
      class="absolute top-0 w-full h-[130px] z-[-1]"
      src="/imgs/pill-shape.png"
      alt="shape"
      width="100"
      height="200"
    />
    <div class="container py-10 sm:px-10 rounded-lg">
      <h2
        data-aos="fade-up"
        class="text-2xl sm:text-4xl mb-8 font-semibold flex items-center gap-2"
      >
        Favorites <Heart :size="30" />
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center"
      >
        <Product
          v-for="product in favoritesStore.favorites"
          :product="product"
          :key="product.id"
        />
        <div
          class="col-span-full text-center p-10 bg-background rounded-lg border-2 border-border"
          data-aos="fade-up"
        >
          <Package :size="40" class="mx-auto mb-4 text-secondary" />
          <h3 class="text-xl font-semibold mb-2">No Favorites Yet</h3>
          <p class="text-secondary">Your Favorites items will appear here</p>
        </div>
      </div>
    </div>
  </main>
</template>
