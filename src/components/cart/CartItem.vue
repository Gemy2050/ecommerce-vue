<script setup lang="ts">
import { X } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import CartGroupButtons from "./CartGroupButtons.vue";
import type { IProduct } from "@/interfaces";
import { useCartStore } from "@/stores/cart";

defineProps<{
  product: IProduct;
}>();

const cartStore = useCartStore();
</script>

<template>
  <div
    data-aos="fade-up"
    :id="`cart-${product.id}`"
    class="cart-item relative bg-background flex items-center gap-2 sm:gap-4 px-2 sm:px-3 lg:px-4 py-8 shadow-xl rounded-lg border border-border"
  >
    <X
      :size="25"
      class="cursor-pointer hover:text-red-500 duration-300 absolute top-1 right-1"
      @click="cartStore.removeProduct(product)"
    />
    <RouterLink :to="`/product/${product.id}`" class="shrink-0">
      <img
        :src="product.imageUrl"
        alt="product"
        class="rounded-lg sm:w-full w-[120px] h-[120px] sm:h-[150px] aspect-square"
      />
    </RouterLink>
    <div class="flex-1 w-full text-center">
      <RouterLink
        :to="`/product/${product.id}`"
        class="text-md font-semibold line-clamp-1 hover:text-primary duration-300"
      >
        {{ product.name }}
      </RouterLink>
      <p class="text-sm text-muted-foreground mt-0">
        {{ product.productCategory }}
      </p>

      <div class="flex gap-2 items-center justify-center" v-if="product.variants">
        <div class="flex items-center gap-1">
          <span
            class="w-[15px] h-[15px] mt-[-1px] rounded-full border"
            :style="{ backgroundColor: product.color }"
          ></span>
          <span class="text-sm text-muted-foreground">
            {{ product.color }}
          </span>
        </div>
        <span class="text-muted-foreground">|</span>
        <span class="text-sm text-muted-foreground">
          {{ product.size }}
        </span>
      </div>

      <div class="flex justify-between items-center gap-3 text-md font-bold mt-6">
        <CartGroupButtons class="!text-md w-[100%] h-6" :product="product" />
        <span class="font-semibold text-gray-400">${{ product.price }}</span>
      </div>
    </div>
  </div>
</template>
