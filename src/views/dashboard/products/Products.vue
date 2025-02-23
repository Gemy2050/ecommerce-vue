<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Dialog from "@/components/ui/Dialog.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Input from "@/components/ui/Input.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import Pagination from "@/components/ui/Pagination.vue";
import Spinner from "@/components/ui/Spinner.vue";
import Table from "@/components/ui/Table.vue";
import { useProducts } from "@/hooks/useProducts";
import { tableSearch } from "@/utils/functions";
import { Image, PenBox, Trash } from "lucide-vue-next";
import { useTemplateRef } from "vue";

const {
  productsQuery: { data, isLoading, error },
  handleDeleteProduct,
  handlePageIndexChange,
  pageIndex,
  PAGE_SIZE,
  disabled,
} = useProducts();
const productsRef = useTemplateRef<HTMLElement>("ProuctsSection");

const tableHeaders = ["image", "name", "category", "price", "discount", "actions"];
</script>

<template>
  <main ref="ProuctsSection">
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Products</h2>
    </PageTitle>

    <div class="mt-2 p-4 rounded-lg bg-background">
      <Button
        as="link"
        to="./products/add"
        class="text-base font-bold mb-8"
        data-aos="fade-up"
      >
        Add Product
      </Button>

      <Input
        type="search"
        placeholder="Search here ..."
        class="w-full mb-4"
        data-aos="fade-up"
        @input="tableSearch"
      />

      <Table :headers="tableHeaders" v-if="data">
        <tr v-for="(product, idx) in data?.data" :key="product.id" class="text-center">
          <td>{{ (pageIndex - 1) * PAGE_SIZE + (idx + 1) }}</td>
          <td>
            <img
              :src="product.imageUrl"
              alt="product image"
              class="w-[80px] h-[50px] mx-auto"
              loading="lazy"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.productCategory }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.priceBeforeDiscount - product.price }}</td>
          <td class="space-x-1 min-w-[115px]">
            <Button
              as="link"
              :to="`./products/images/${product.id}`"
              class="p-1 !bg-green-600 hover:!bg-green-500 duration-200"
              size="sm"
              rounded="md"
            >
              <Image :size="14" />
            </Button>
            <Button
              as="link"
              :to="`/dashboard/products/edit/${product.id}`"
              class="p-1"
              size="sm"
            >
              <PenBox :size="14" />
            </Button>
            <Dialog
              :action="() => handleDeleteProduct(product.id)"
              :title="`Are you sure to delete this product '${product.name}'?`"
              description="you cannot retrieve this product after deleting it."
            >
              <template #trigger="{ openModal }">
                <Button
                  variant="destructive"
                  size="sm"
                  @click="openModal"
                  :disabled="disabled"
                  hide-loader
                >
                  <Trash :size="14" />
                </Button>
              </template>
            </Dialog>
          </td>
        </tr>
      </Table>
      <Pagination
        :data="data"
        :pageIndex="pageIndex"
        :scroll-to-top="productsRef"
        @pageIndexChange="handlePageIndexChange"
      />
      <Spinner v-if="isLoading" />
      <ErrorMessage message="Something went wrong" v-if="error" />
    </div>
  </main>
</template>
