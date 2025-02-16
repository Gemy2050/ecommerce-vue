<script setup lang="ts">
import CartItem from "@/components/cart/CartItem.vue";
import Button from "@/components/ui/Button.vue";
import { axiosInstance } from "@/config/axios.config";
import { useCartStore } from "@/stores/cart";
import { getTotalPrice } from "@/utils/functions";
import { loadStripe } from "@stripe/stripe-js";
import { ShoppingBag } from "lucide-vue-next";
import { ref, TransitionGroup } from "vue";
import { useToast } from "vue-toastification";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);
const cartStore = useCartStore();
const disabled = ref(false);
const toast = useToast();

const handleCheckout = async () => {
  try {
    disabled.value = true;

    const stripe = await stripePromise;

    const { data } = await axiosInstance.post("/checkout", {
      items: cartStore.cart,
      baseUrl: location.origin,
    });

    // Redirect to Stripe checkout
    await stripe?.redirectToCheckout({
      sessionId: data.sessionId,
    });
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    disabled.value = false;
  }
};
</script>
<template>
  <main class="relative pt-20 pb-20">
    <img
      class="fixed top-0 w-full h-[200px] z-[-1]"
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
        My Cart <ShoppingBag :size="30" />
      </h2>
      <TransitionGroup
        name="fade"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center"
      >
        <!-- Loop on Cart Items -->
        <CartItem
          v-for="product in cartStore.cart"
          :key="product.id"
          :product="product"
        />
      </TransitionGroup>

      <div
        data-aos="fade-up"
        data-aos-offset="0"
        class="bg-background mt-16 w-[450px] max-w-full mx-auto p-5 rounded-lg border border-border shadow-lg"
      >
        <template v-if="cartStore.cart.length == 0">
          <h3 class="text-3xl text-center mb-8">Your Cart is Empty</h3>
          <Button as="link" to="/products" full-width> Browse Products </Button>
        </template>

        <template v-else>
          <h3 class="text-3xl text-center">
            Total Price <br />
            ${{ getTotalPrice(cartStore.cart) }}
          </h3>
          <Button
            class="rounded-lg mt-5"
            fullWidth
            :disabled="disabled"
            @click="handleCheckout"
          >
            Proceed to Checkout
          </Button>
        </template>
      </div>
    </div>
  </main>
</template>
