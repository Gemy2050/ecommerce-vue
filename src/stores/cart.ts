import type { IProduct } from "@/interfaces";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useCartStore = defineStore("cart", () => {
  const initialState = JSON.parse(localStorage.getItem("cart") || "[]");

  const cart = reactive<IProduct[]>(initialState);

  const addToCart = (product: IProduct) => {
    const quantity = product.quantity || 0;
    const productIndex = cart.findIndex((el) => el.id === product.id);

    if (productIndex != -1) {
      cart[productIndex] = {
        ...product,
        quantity: quantity + 1,
      };
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeFromCart = (product: IProduct) => {
    const productIndex = cart.findIndex((el) => el.id === product.id);

    if (productIndex !== -1) {
      if (cart[productIndex].quantity! > 1) {
        cart[productIndex].quantity! -= 1;
      } else {
        cart.splice(productIndex, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeProduct = (product: IProduct) => {
    const productIndex = cart.findIndex((el) => el.id === product.id);
    cart.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const clearCart = () => {
    cart.splice(0, cart.length);
    localStorage.removeItem("cart");
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    removeProduct,
    clearCart,
  };
});
