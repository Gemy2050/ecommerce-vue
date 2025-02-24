<script setup lang="ts">
import OrderDetails from "@/components/dashboard/OrderDetails.vue";
import Dialog from "@/components/ui/Dialog.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Input from "@/components/ui/Input.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import Pagination from "@/components/ui/Pagination.vue";
import Spinner from "@/components/ui/Spinner.vue";
import Table from "@/components/ui/Table.vue";
import { axiosInstance } from "@/config/axios.config";
import type { IOrder, IQuery } from "@/interfaces";
import { getStatusColor, tableSearch } from "@/utils/functions";
import { useQuery } from "@tanstack/vue-query";
import { format } from "date-fns";
import { RefreshCw } from "lucide-vue-next";
import { computed, ref, useTemplateRef, watchEffect } from "vue";

const INDEX = Number(sessionStorage.getItem("ordersIndex") || 1);
const PAGE_SIZE = 10;

const pageIndex = ref(INDEX);

const ordersRef = useTemplateRef<HTMLElement>("ordersRef");

const queryKey = computed(() => ["getOrders", `${pageIndex.value}`]);

const { data: orders, error, isFetching, refetch } = useQuery<IQuery<IOrder>>({
  queryKey,
  queryFn: async () =>
    (
      await axiosInstance.get(
        `/orders?pageIndex=${pageIndex.value}&pageSize=${PAGE_SIZE}`
      )
    ).data,
});

const tableHeaders = ["name", "email", "address", "total amount", "created at", "status"];

function handlePageIndexChange(index: number) {
  pageIndex.value = index;
}

watchEffect(() => {
  sessionStorage.setItem("ordersIndex", pageIndex.value.toString());
});
</script>

<template>
  <main ref="ordersRef">
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Orders</h2>
      <RefreshCw
        :size="25"
        :class="`cursor-pointer hover:text-primary transition-all
      duration-500 ease-linear ${
        isFetching ? 'animate-spin pointer-events-noneopacity-50' : ''
      }`"
        @click="refetch()"
      />
    </PageTitle>

    <div class="mt-2 p-4 rounded-lg bg-background">
      <Input
        type="search"
        placeholder="Search here ..."
        class="w-full mb-4"
        @input="tableSearch"
      />

      <Table
        v-if="orders?.data && !isFetching"
        class="!min-w-[1050px]"
        :headers="tableHeaders"
      >
        <tr v-for="(order, idx) in orders?.data" :key="order.id">
          <td class="!p-5">{{ (pageIndex - 1) * PAGE_SIZE + (idx + 1) }}</td>
          <td class="!p-5 capitalize">
            {{ order.firstName + " " + order.secondName }}
          </td>
          <td class="!p-5">{{ order.email }}</td>
          <td class="!p-5">{{ order.address }}</td>
          <td class="!p-5">${{ order.totalAmount }}</td>
          <td class="!p-5">
            {{ format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a") }}
          </td>
          <td class="!p-5">
            <Dialog title="Order Details">
              <template #trigger="{ openModal }">
                <span
                  @click="openModal"
                  class="cursor-pointer text-blue-500 hover:underline me-3 font-semibold"
                >
                  View
                </span>
              </template>
              <OrderDetails :order="order" />
            </Dialog>
            <span
              :class="[getStatusColor(order.status), 'px-2 py-1 rounded-full text-sm']"
            >
              {{ order.status }}
            </span>
          </td>
        </tr>
      </Table>
      <Pagination
        v-if="orders && !isFetching"
        :data="orders"
        :pageIndex="pageIndex"
        :scroll-to-top="ordersRef"
        @pageIndexChange="handlePageIndexChange"
      />

      <Spinner v-if="isFetching" />

      <ErrorMessage message="Something went wrong" v-if="error" />
    </div>
  </main>
</template>
