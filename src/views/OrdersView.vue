<script setup lang="ts">
import Spinner from "@/components/ui/Spinner.vue";
import { Clock, DollarSign, Package } from "lucide-vue-next";
import { format } from "date-fns/format";
import type { IOrder } from "@/interfaces";
import { useQuery } from "@tanstack/vue-query";
import { useUserAuth } from "@/stores/userAuth";
import { axiosInstance } from "@/config/axios.config";

const userStore = useUserAuth();

const { data: orders, isLoading } = useQuery<IOrder[]>({
  queryKey: ["orders"],
  queryFn: async () => {
    const { data } = await axiosInstance(
      `/order?email=${userStore.user?.email}`
    );
    return data;
  },
});
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

    <div class="container py-10">
      <h2
        data-aos="fade-up"
        class="text-2xl sm:text-4xl mb-8 font-semibold flex items-center gap-2"
      >
        My Orders <Package :size="30" />
      </h2>

      <div class="grid gap-6">
        <Spinner v-if="isLoading" />
        <div
          v-if="orders?.length || 0 > 0"
          v-for="order in orders"
          :key="order.sessionId"
          data-aos="fade-up"
          class="bg-background p-6 rounded-lg border border-border shadow-lg"
        >
          <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div class="flex items-center gap-2 text-secondary">
              <Clock :size="20" />
              {{ format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a") }}
            </div>
            <div class="flex items-center gap-2 font-semibold">
              <DollarSign :size="20" />
              Total: ${{ order.totalAmount }}
            </div>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <div
              v-for="item in order.items"
              key="{item.id}"
              class="flex items-center gap-4 p-4 bg-[#EEE] dark:bg-[#111] rounded-lg"
            >
              <img
                :src="item.imageUrl"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-md"
              />
              <div class="flex-1">
                <h5 class="font-semibold">{{ item.name }}</h5>
                <p class="text-secondary text-sm">
                  Quantity: {{ item.quantity }} × ${{ item.price }}
                </p>
                <div class="flex gap-2 items-center">
                  <div class="flex items-center gap-1">
                    <span
                      class="w-[15px] h-[15px] mt-[-1px] block rounded-full border"
                      :style="{ backgroundColor: item.color }"
                    ></span>
                    <span class="text-sm text-secondary">
                      {{ item.color }}
                    </span>
                  </div>
                  <span class="text-secondary">|</span>
                  <span class="text-sm text-secondary">
                    Size: {{ item.size }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-4 p-3 bg-muted rounded-lg flex flex-wrap gap-3 items-center justify-between"
          >
            <span class="font-medium text-sm">ID: {{ order.id }}</span>
            <span
              class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
            >
              {{ order.status }}
            </span>
          </div>
        </div>

        <div
          class="text-center p-10 bg-background rounded-lg border border-border"
          data-aos="fade-up"
          v-if="orders?.length === 0"
        >
          <Package :size="40" class="mx-auto mb-4 text-secondary" />
          <h3 class="text-xl font-semibold mb-2">No Orders Yet</h3>
          <p class="text-secondary">Your ordered items will appear here</p>
        </div>
      </div>
    </div>
  </main>
</template>
