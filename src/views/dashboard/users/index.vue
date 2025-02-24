<script setup lang="ts">
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Input from "@/components/ui/Input.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import Pagination from "@/components/ui/Pagination.vue";
import Spinner from "@/components/ui/Spinner.vue";
import Table from "@/components/ui/Table.vue";
import { axiosInstance } from "@/config/axios.config";
import type { IUser } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { useQuery } from "@tanstack/vue-query";
import { format } from "date-fns";
import { RefreshCw } from "lucide-vue-next";
import { ref, useTemplateRef, watchEffect } from "vue";

const INDEX = Number(sessionStorage.getItem("usersIndex") || 1);
const PAGE_SIZE = 10;

const pageIndex = ref(INDEX);

const usersRef = useTemplateRef<HTMLElement>("usersRef");

const { data, error, isFetching, refetch } = useQuery<{ users: IUser[] }>({
  queryKey: ["getUsers"],
  queryFn: async () => (await axiosInstance.get(`/get-users`)).data,
});

const tableHeaders = ["image", "name", "email", "phone", "address", "created at"];

function handlePageIndexChange(index: number) {
  pageIndex.value = index;
}

watchEffect(() => {
  sessionStorage.setItem("usersIndex", pageIndex.value.toString());
});
</script>

<template>
  <main ref="usersRef">
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Users</h2>
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
        v-if="data?.users && !isFetching"
        class="!min-w-[1050px]"
        :headers="tableHeaders"
      >
        <tr v-for="(user, idx) in data?.users" :key="user.id">
          <td class="!p-5">{{ (pageIndex - 1) * PAGE_SIZE + (idx + 1) }}</td>
          <td class="!p-5">
            <img :src="user.image" alt="user image" class="w-10 h-10 rounded-full" />
          </td>
          <td class="!p-5 capitalize">
            {{ user.firstName + " " + user.secondName }}
          </td>
          <td class="!p-5">{{ user.email }}</td>
          <td class="!p-5">{{ user.phone }}</td>
          <td class="!p-5">{{ user.address }}</td>
          <td class="!p-5">
            {{ format(new Date(user.createdAt), "dd MMM, yyyy - hh:mm a") }}
          </td>
        </tr>
      </Table>
      <Pagination
        v-if="data?.users && !isFetching"
        :data="{ count: data?.users?.length || 0, pageSize: PAGE_SIZE }"
        :pageIndex="pageIndex"
        :scroll-to-top="usersRef"
        @pageIndexChange="handlePageIndexChange"
      />
      <Spinner v-if="isFetching" />
      <ErrorMessage message="Something went wrong" v-if="error" />
    </div>
  </main>
</template>
