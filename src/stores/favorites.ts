import type { IProduct } from "@/interfaces";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const initialValue = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favorites = ref<IProduct[]>(initialValue);

  const setFavorites = (favs: IProduct[]) => {
    favorites.value = favs;
    localStorage.setItem("favorites", JSON.stringify(favs));
  };
  const clearFavorites = () => {
    favorites.value = [];
    localStorage.removeItem("favorites");
  };

  return {
    favorites,
    setFavorites,
    clearFavorites,
  };
});
