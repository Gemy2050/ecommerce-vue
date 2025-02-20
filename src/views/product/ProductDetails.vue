<script setup lang="ts">
import CartGroupButtons from "@/components/cart/CartGroupButtons.vue";
import Button from "@/components/ui/Button.vue";
import Loader from "@/components/ui/Loader.vue";
import { axiosInstance } from "@/config/axios.config";
import type { Colors, IProduct } from "@/interfaces";
import { useCartStore } from "@/stores/cart";
import { useProdutsStore } from "@/stores/products";
import { useQuery } from "@tanstack/vue-query";
import { computed, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

//* Router & Store Setup
const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const productsStore = useProdutsStore();
const productId = route.params.id;

//* Computed
const existProduct = computed(() => {
  return (
    cartStore.cart.find((product) => product.id == productId) ||
    productsStore.products.find((product) => product.id == productId)
  );
});

//* Reactive States
const product = ref(existProduct.value);
const colorId = ref(existProduct.value?.color);
const sizeId = ref(existProduct.value?.size);
const availableSizes = ref();

const { data, isLoading, isFetched, error } = useQuery<IProduct>({
  queryKey: ["product", `${productId}`],
  queryFn: async () => {
    const { data } = await axiosInstance.get(`/product/get-product?id=${productId}`);

    return data;
  },
  enabled: !existProduct.value,
});

//* Watchers
watchEffect(() => {
  product.value = data.value || existProduct.value;

  if (isFetched.value && (!data.value || error.value)) {
    router.replace("/"); // Redirect to home if no data or error occurs
  }
});

watch(
  [colorId, sizeId, product],
  () => {
    if (product.value && !colorId.value) {
      colorId.value = product.value.variants?.[0].color;
      return;
    }

    if (product.value) {
      const sizes = product.value.variants?.find(({ color }) => color === colorId.value)
        ?.sizes;

      availableSizes.value = sizes!;

      if (!sizeId.value) sizeId.value = sizes?.[0].size || 0;
    }
  },
  { immediate: true }
);

//* Methods
const handleSetColor = ({ color, sizes }: Colors) => {
  colorId.value = color;
  sizeId.value = 0;
  const quantity = (product.value?.quantity || 0) - 1;

  product.value = {
    ...product.value!,
    color,
    quantity,
    size: sizes?.[0].size,
  };

  cartStore.addToCart(product.value);
};

const handleSetSize = (size: number | string) => {
  sizeId.value = size;
  const quantity = (product.value?.quantity || 0) - 1;

  product.value = {
    ...product.value!,
    size,
    quantity,
  };
  cartStore.addToCart(product.value);
};
</script>
<template>
  <Loader v-if="isLoading" />
  <main class="relative pt-60 pb-20 overflow-x-hidden" v-if="product">
    <img
      class="absolute top-0 w-full h-[200px] z-[-1]"
      src="/imgs/pill-shape.png"
      alt="shape"
      width="{100}"
      height="{200}"
    />
    <div class="container">
      <img
        class="-mt-[200px] mb-5 w-[350px] h-[280px] max-w-full rounded-lg border border-border shadow-lg mx-auto"
        :src="product.imageUrl"
        :alt="product.name"
        data-aos="fade-left"
      />

      <!-- Images Slider -->

      <div
        class="px-10 text-center"
        data-aos="fade-right"
        v-if="Number(product.productImages?.length) > 0"
      >
        <Carousel
          :wrap-around="true"
          :breakpoints="{
            320: { itemsToShow: 1 },
            575: { itemsToShow: 2 },
            768: { itemsToShow: 3 },
            1024: { itemsToShow: 4 },
          }"
          :gap="20"
          :transition="500"
          :autoplay="3000"
          :items-to-scroll="1"
        >
          <Slide v-for="(image, index) in product.productImages" :key="index">
            <img
              :src="image.imageUrl"
              class="select-none cursor-grab w-full h-[220px] rounded-lg border border-border shadow-lg"
              alt="Carousel Image"
            />
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>

      <div class="mt-24 flex flex-col md:flex-row justify-between gap-10">
        <div class="w-[500px] max-w-full flex flex-col gap-4" data-aos="fade-right">
          <h3 class="text-3xl font-semibold flex items-center justify-between gap-4">
            {{ product.productCategory }}
            <div class="font-normal flex gap-2">
              <span
                v-if="product.hasDiscount"
                class="text-base line-through text-gray-500"
              >
                ${{ product.priceBeforeDiscount }}
              </span>

              <span class="text-2xl">${{ product.price }}</span>
            </div>
          </h3>
          <h4 class="text-lg">{{ product.name }}</h4>
          <p class="text-gray-500" v-html="product.description"></p>
        </div>

        <div class="w-[500px] max-w-full" data-aos="fade-left">
          <h3 class="text-3xl font-semibold mb-4">Colors</h3>
          <div class="mb-8 flex flex-wrap items-center gap-4">
            <button
              v-for="(color, i) in product.variants"
              :key="color.id"
              :class="`${
                (colorId ? colorId === color.color : i === 0) ? 'active' : ''
              } cursor-pointer select-none [&.active]:bg-primary [&.active]:text-white  block p-1 rounded-lg border border-border text-center font-semibold text-gray-500`"
              @click="handleSetColor(color)"
            >
              {{ color.color }}
            </button>
          </div>
          <h3 class="text-2xl font-semibold mb-4">Available Sizes</h3>
          <div class="mb-8 flex flex-wrap items-center gap-4">
            <button
              v-for="({ size }, i) in availableSizes"
              :key="i"
              :class="`${
                (sizeId ? sizeId === size : i === 0) && 'active'
              } cursor-pointer select-none [&.active]:bg-primary [&.active]:text-white block w-[35px] h-[35px] rounded-lg border border-border text-center font-semibold text-sm leading-9 text-gray-500`"
              @click="handleSetSize(size)"
            >
              {{ size }}
            </button>
          </div>

          <Button
            v-if="!product.quantity"
            fullWidth
            @click="
              cartStore.addToCart({
                ...product,
                color: colorId,
                size: sizeId,
              } as IProduct)
            "
          >
            Add To Cart
          </Button>
          <CartGroupButtons
            v-else
            class="w-full mx-auto"
            :product="product as IProduct"
          />
        </div>
      </div>
    </div>
  </main>
</template>
