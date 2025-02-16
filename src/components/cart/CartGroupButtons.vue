<script setup lang="ts">
import type { IProduct } from "@/interfaces";
import Button from "../ui/Button.vue";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{
  class?: string;
  product: IProduct;
}>();
const cartStore = useCartStore();
</script>

<template>
  <div
    :class="`rounded-full  h-10 w-full max-w-full bg-primary text-white flex items-center gap-2 ${props.class}`"
  >
    <Button
      class="w-full !h-[100%] text-lg font-bold"
      size="sm"
      @click="cartStore.removeFromCart(product)"
    >
      -
    </Button>
    <span class="w-full text-center leading-tight font-bold">
      {{ product.quantity || 0 }}
    </span>
    <Button
      class="w-full !h-[100%] text-lg font-bold"
      size="sm"
      @click="cartStore.addToCart(product)"
    >
      +
    </Button>
  </div>
</template>
