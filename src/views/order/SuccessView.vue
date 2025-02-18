<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Loader from "@/components/ui/Loader.vue";
import { axiosInstance } from "@/config/axios.config";
import { useCartStore } from "@/stores/cart";
import { useUserAuth } from "@/stores/userAuth";
import { getTotalPrice } from "@/utils/functions";
import { CheckCircle2 } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted, ref, watchEffect } from "vue";
import { RouterLink, useRouter } from "vue-router";

const { user } = storeToRefs(useUserAuth());
const cartStore = useCartStore();
const router = useRouter();

const isLoading = ref(true);
const isValid = ref(false);

const sessionId = router.currentRoute.value.query.session_id;

onMounted(() => {
  validateSession();
});

const validateSession = async () => {
  if (!sessionId || !cartStore.cart.length) {
    isLoading.value = false;
    router.replace("/");
    return;
  }

  try {
    const { data } = await axiosInstance(
      `/validate-session?session_id=${sessionId}`
    );
    const valid = data.valid;
    isValid.value = valid;
    if (valid) {
      await storeOrder();
    }
  } finally {
    isLoading.value = false;
  }
};

const storeOrder = async () => {
  const orderData = {
    sessionId,
    email: user.value?.email,
    firstName: user.value?.firstName,
    secondName: user.value?.secondName,
    address: user.value?.address || "",
    phone: user.value?.phone || "",
    items: JSON.stringify(cartStore.cart),
    totalAmount: getTotalPrice(cartStore.cart),
    status: "completed",
  };

  const response = await axiosInstance.post("/order", {
    ...orderData,
  });

  if (response.status === 201) {
    cartStore.clearCart();
  }
};

watchEffect(() => {
  if (!isValid.value && !isLoading.value) {
    router.replace("/");
  }
});
</script>
<template>
  <Loader v-if="isLoading" />
  <main
    class="relative min-h-[calc(100dvh-64px)] flex items-center justify-center pt-16 pb-20"
    v-else
  >
    <img
      src="/imgs/square.svg"
      class="w-[150px] md:block fixed bottom-0 right-[-40px] z-[-1]"
      alt="square shape"
    />
    <img
      src="/imgs/square.svg"
      class="w-[170px] md:block fixed top-0 left-0 z-[-1] rotate-180"
      alt="square shape"
    />
    <div class="container flex items-center justify-center">
      <div
        data-aos="fade-up"
        class="bg-background p-8 rounded-xl shadow-lg border border-border max-w-md w-full text-center"
      >
        <CheckCircle2 class="w-20 h-20 text-green-500 mx-auto mb-6" />

        <h1 class="text-3xl font-bold mb-4">Order Confirmed!</h1>

        <p class="text-muted-foreground text-lg mb-8">
          Thank you for your purchase. Your order has been successfully placed
          and will be processed soon.
        </p>

        <div class="flex flex-col gap-3">
          <RouterLink to="/products">
            <Button class="w-full"> Continue Shopping </Button>
          </RouterLink>

          <RouterLink to="/orders">
            <Button variant="outline" class="w-full duration-500">
              View Orders
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
