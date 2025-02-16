import type { IProduct } from "@/interfaces";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProdutsStore = defineStore("products", () => {
  const products = ref<IProduct[]>([]);
  const setProducts = (data: IProduct[]) => {
    products.value = data;
  };

  return {
    products,
    setProducts,
  };
});
