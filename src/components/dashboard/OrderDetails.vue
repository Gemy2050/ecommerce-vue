<script setup lang="ts">
import type { IOrder } from "@/interfaces";
import { getStatusColor } from "@/utils/functions";
import { format } from "date-fns";

defineProps<{
  order: IOrder;
}>();
</script>
<template>
  <div class="space-y-6">
    <!-- Order Date & ID -->
    <div class="bg-[#EEE] dark:bg-[#111] p-4 rounded-lg">
      <div class="flex flex-wrap justify-center sm:justify-between gap-5 items-center">
        <div class="text-center">
          <p class="text-sm text-secondary">Order ID</p>
          <p class="font-medium">{{ order.id }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-secondary">Order Date</p>
          <p class="font-medium">
            {{ format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a") }}
          </p>
        </div>
      </div>
    </div>

    <!-- Customer Details -->
    <div>
      <h3 class="font-semibold text-lg mb-3">Customer Information</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <p class="text-sm text-secondary font-semibold">Full Name</p>
          <p class="font-medium capitalize">
            {{ `${order.firstName} ${order.secondName}` }}
          </p>
        </div>
        <div class="space-y-1 md:col-span-2">
          <p class="text-sm text-secondary font-semibold">Phone</p>
          <p class="font-medium">{{ order.phone }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-sm text-secondary font-semibold">Email</p>
          <p class="font-medium">{{ order.email }}</p>
        </div>

        <div class="space-y-1 md:col-span-2">
          <p class="text-sm text-secondary font-semibold">Address</p>
          <p class="font-medium">{{ order.address }}</p>
        </div>
      </div>
    </div>

    <hr />

    <!--  Order Items  -->
    <div>
      <h3 class="font-semibold text-lg mb-4">Order Items</h3>
      <div class="space-y-3">
        <div
          :key="item.id"
          class="flex items-center justify-between p-3 rounded-lg border bg-[#EEE] dark:bg-[#111] hover:bg-accent/50 transition-colors"
          v-for="item in order.items"
        >
          <div class="flex items-center gap-4">
            <img
              :src="item.imageUrl"
              :alt="item.name"
              class="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <p class="text-sm font-medium">{{ item.name }}</p>
              <p class="text-sm text-secondary mt-1 font-medium">
                Quantity: {{ item.quantity }}
              </p>
              <div class="flex gap-2 items-center" v-if="item.color">
                <div class="flex items-center gap-1">
                  <span
                    class="w-[15px] h-[15px] mt-[-1px] rounded-full border"
                    :style="{ backgroundColor: item.color }"
                  ></span>
                  <span class="text-sm text-secondary">
                    {{ item.color }}
                  </span>
                </div>
                <span class="secondary">|</span>
                <span class="text-sm text-secondary">
                  {{ item.size }}
                </span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="font-medium">${{ item.price }}</p>
            <p class="text-[12px] sm:text-sm text-secondary">
              Total: ${{ (item.price * item.quantity!).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Summary  -->
    <div class="bg-muted/50 p-4 rounded-lg">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-secondary font-bold">Order Status</p>
          <span
            :class="`inline-block mt-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
              order.status
            )}`"
          >
            {{ order.status }}
          </span>
        </div>
        <div class="text-right">
          <p class="text-sm text-secondary font-bold">Total Amount</p>
          <p class="text-xl font-bold">${{ order.totalAmount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
