<script setup lang="ts">
import { RefreshCw } from "lucide-vue-next";
import { useQuery } from "@tanstack/vue-query";
import { axiosInstance } from "@/config/axios.config";
import PageTitle from "@/components/ui/PageTitle.vue";
import { computed } from "@vue/reactivity";
import Spinner from "@/components/ui/Spinner.vue";
import type { IAnalytics } from "@/interfaces";
import { format } from "date-fns";
import { useMode } from "@/stores/mode";
import Table from "@/components/ui/Table.vue";
import { getStatusColor } from "@/utils/functions";
import Dialog from "@/components/ui/Dialog.vue";
import OrderDetails from "@/components/dashboard/OrderDetails.vue";
import { ANALYTICS } from "@/data/analytics";

const modeStore = useMode();

const { data: analytics, refetch, isFetching, isLoading } = useQuery<IAnalytics>({
  queryKey: ["getAnalytics"],
  queryFn: async () => (await axiosInstance.get("/analytics")).data,
});

const chartTheme = computed(() => ({
  chart: {
    background: "transparent",
    foreColor: modeStore.mode === "dark" ? "#fff" : "#333",
    toolbar: { show: false },
  },
  colors: ["#f0ac0d"],
  tooltip: { theme: modeStore.mode },
}));

// Sales Overview Chart
const salesData = computed(() => {
  return analytics.value?.charts.salesOverview?.map((day) => ({
    date: format(day.createdAt, "MMM dd"),
    sales: day._sum.totalAmount || 0,
  }));
});

const salesChartOptions = computed(() => {
  if (!analytics.value)
    return { chart: { toolbar: { show: false } }, xaxis: {}, yaxis: {} };
  return {
    ...chartTheme.value,
    xaxis: {
      categories: analytics.value.charts.salesOverview.map((day) =>
        format(day.createdAt, "MMM dd")
      ),
    },
    yaxis: { labels: { formatter: (value: number) => value.toFixed(0) } },
  };
});

const salesSeries = computed(() => [
  { name: "Sales", data: salesData.value?.map((d) => d.sales) },
]);

// Top Products Chart
const topProductsChartOptions = computed(() => {
  if (!analytics.value)
    return { chart: { toolbar: { show: false } }, xaxis: {}, yaxis: {} };
  return {
    ...chartTheme.value,
    xaxis: {
      categories: analytics.value.charts.topProducts.map((p: any) => p.name),
    },
    yaxis: { labels: { formatter: (value: number) => value.toFixed(0) } },
  };
});

const topProductsSeries = computed(() => {
  if (!analytics.value) return [];
  return [
    {
      name: "Quantity",
      data: analytics.value.charts.topProducts.map((p) => p.quantity),
    },
  ];
});

// * Recent Orders Table Headers
const headers = ["name", "Email", "address", "Toatal amount", "Created at", "Status"];
</script>
<template>
  <div class="flex items-center justify-center h-[calc(100vh-100px)]" v-if="isLoading">
    <Spinner />
  </div>
  <div class="space-y-3" v-if="analytics && !isLoading">
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Analytics</h2>
      <RefreshCw
        :size="25"
        :class="`cursor-pointer hover:text-primary transition-all duration-500 ease-linear ${
          isFetching ? 'animate-spin pointer-events-none opacity-50' : ''
        }`"
        @click="refetch()"
      />
    </PageTitle>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        data-aos="fade-up"
        class="rounded-lg bg-background p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4"
        :class="border"
        v-for="{ bg, color, icon, title, label, border } in ANALYTICS"
      >
        <div class="flex items-center space-x-4">
          <div class="p-3 rounded-full transition-colors duration-300" :class="bg">
            <component :is="icon" :class="color" />
          </div>
          <div>
            <p class="text text-secondary font-bold">{{ title }}</p>
            <h3 class="text-2xl font-bold">
              {{
                Number(
                  analytics?.metrics[label as keyof IAnalytics["metrics"]]
                ).toLocaleString()
              }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        data-aos="fade-right"
        class="rounded-lg p-3 sm:p-6 transition-all duration-300 hover:shadow-lg bg-background"
      >
        <h3 class="text-lg font-semibold mb-4">Sales Overview</h3>
        <apexchart
          type="area"
          height="300"
          :options="salesChartOptions"
          :series="salesSeries"
        />
      </div>

      <div
        data-aos="fade-left"
        class="rounded-lg p-3 sm:p-6 transition-all duration-300 hover:shadow-lg bg-background"
      >
        <h3 class="text-lg font-semibold mb-4">Top Products</h3>
        <apexchart
          type="bar"
          height="300"
          :options="topProductsChartOptions"
          :series="topProductsSeries"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="rounded-lg bg-background col-span-full p-3 sm:p-6 transition-all duration-300 hover:shadow-lg"
        data-aos="fade-up"
      >
        <h3 class="text-lg font-semibold mb-4">Recent Orders</h3>
        <Table class="!min-w-[1050px]" :headers="headers">
          <tr v-for="(order, idx) in analytics?.recentOrders" :key="order.id">
            <td class="!p-5">{{ idx + 1 }}</td>
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
      </div>
    </div>
  </div>
</template>
