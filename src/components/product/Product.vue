<script setup lang="ts">
import type { IProduct } from "@/interfaces";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { Heart, ShoppingCart, X } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const props = defineProps<{
  product: IProduct;
}>();

const toast = useToast();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);
const { setFavorites } = favoritesStore;

const isFavorite = ref(
  favorites.value.some((el) => el.id === props.product.id)
);

let isInCart = ref(!!cartStore.cart.find((el) => el.id === props.product.id));

const toggleFavorites = () => {
  if (!isFavorite.value) {
    isFavorite.value = true;
    setFavorites([...favorites.value, props.product]);
    return;
  }

  const favs = favorites.value.filter((el) => el.id !== props.product.id);
  setFavorites(favs);
  isFavorite.value = false;
};
const toggleCart = () => {
  toast.clear();

  if (!isInCart.value) {
    const variant = props.product.variants?.[0];
    cartStore.addToCart({
      ...props.product,
      color: variant?.color,
      size: variant?.sizes?.[0].size,
    });
    isInCart.value = true;
    toast.success("Product added to cart");
    return;
  }

  cartStore.removeFromCart(props.product);
  isInCart.value = false;
  toast.success("Product removed from cart");
};
</script>
<template>
  <div
    data-aos="fade-up"
    class="relative overflow-hidden flex flex-col items-center gap-2 bg-background p-5 border-2 border-border rounded-lg [&:hover]:border-primary shadow-xl [&:hover_img]:scale-110 [&:hover_img]:rotate-[4deg] duration-500"
  >
    <div class="flex justify-between items-center w-full">
      <ShoppingCart
        :size="30"
        class="cursor-pointer p-1 rounded-full hover:text-green-500 duration-300"
        v-if="!isInCart"
        @click="toggleCart"
      />
      <X
        :size="30"
        class="cursor-pointer p-1 rounded-full hover:text-red-500 duration-300"
        @click="toggleCart"
        v-else
      />
      <Heart
        :size="30"
        :class="`${
          isFavorite && 'bg-foreground text-background'
        } ms-auto cursor-pointer p-1 rounded-full hover:text-red-500 duration-300`"
        @click="toggleFavorites"
      />
    </div>

    <RouterLink
      :to="`/product/${product.id}`"
      class="w-full cursor-pointer relative overflow-hidden rounded-lg"
    >
      <img
        class="w-full h-[200px] max-w-full rounded-lg mx-auto duration-500"
        :src="product.imageUrl"
        :alt="product.name"
        loading="lazy"
        width="250"
        height="200"
      />
    </RouterLink>
    <h4 class="text-gray-400">{{ product.category }}</h4>
    <RouterLink
      :to="`/product/${product.id}`"
      class="line-clamp-2 text-lg font-semibold min-h-[50px] text-center hover:text-primary duration-500 cursor-pointer"
    >
      {{ product.name }}
    </RouterLink>
    <p
      class="line-clamp-3 min-h-[75px] w-full"
      v-html="product.description"
    ></p>
    <div class="flex justify-between items-center w-full">
      <h5 class="font-bold">{{ product.productCategory }}</h5>
      <div class="flex items-center gap-2">
        <h4
          class="text-sm text-gract400 line-through"
          v-if="product.hasDiscount"
        >
          ${{ product.priceBeforeDiscount }}
        </h4>
        <h4 class="font-bold text-gray-400">${{ product.price }}</h4>
      </div>
    </div>
    <div
      class="absolute bottom-[-15px] right-[-15px] w-[100px] h-[100px] rounded-full bg-primary dark:opacity-30 dark:bg-primary/25 blur-3xl"
    />
  </div>
</template>
