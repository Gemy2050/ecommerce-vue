<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Dialog from "@/components/ui/Dialog.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Input from "@/components/ui/Input.vue";
import Loader from "@/components/ui/Loader.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import Spinner from "@/components/ui/Spinner.vue";
import Table from "@/components/ui/Table.vue";
import { axiosFormData, axiosInstance } from "@/config/axios.config";
import type { IAxiosError, IProduct, IQuery } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { AxiosError } from "axios";
import { CornerUpRight, Trash } from "lucide-vue-next";
import { ref, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const tableHeaders = ["image", "actions"];

const product = ref<IProduct | undefined>(undefined);
const disabled = ref<boolean>(false);

const toast = useToast();
const queryClient = useQueryClient();
const route = useRoute();
const productId = route.params.id;

const { data: products, error, isLoading } = useQuery<IQuery<IProduct>>({
  queryKey: ["get-products"],
  queryFn: async () =>
    (await axiosInstance.get("/product/get-all-products?pageSize=1000&pageIndex=1")).data,
});

const handleDeleteImage = async (imgId: number, imageUrl: string) => {
  try {
    disabled.value = true;
    const formData = new FormData();
    formData.append("id", String(imgId));
    await axiosFormData.delete(
      `productImage/delete-image?id=${imgId}&imageUrl=${imageUrl}`,
      {
        data: formData,
      }
    );
    toast.success("Image deleted successfully");
    queryClient.invalidateQueries({ queryKey: ["get-products"] });
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    disabled.value = false;
  }
};

const deletAllImages = async () => {
  try {
    disabled.value = true;
    await axiosInstance.delete(`/productImage/delete-all-images?id=${productId}`);
    toast.success("Images deleted successfully");
    queryClient.invalidateQueries({ queryKey: ["get-products"] });
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    disabled.value = false;
  }
};

watchEffect(() => {
  if (products.value) {
    product.value = products.value.data?.find(
      (product) => String(product.id) == String(productId)
    );
  }
});
</script>

<template>
  <Loader v-if="isLoading" />
  <div v-if="product && !isLoading">
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Product Images</h2>
      <RouterLink relative="path" to="/dashboard/products">
        <CornerUpRight :size="40" />
      </RouterLink>
    </PageTitle>

    <div class="mt-2 p-4 rounded-lg bg-background" data-aos="fade-up">
      <Button
        as="link"
        :to="{ name: 'products-images-add', params: { id: productId } }"
        rounded="md"
        class="text-base font-bold mb-5 me-3"
      >
        Add Images
      </Button>

      <Dialog
        :action="() => deletAllImages()"
        :title="`Are you sure to delete all images?`"
        description="you cannot retrieve images after deleting."
      >
        <template #trigger="{ openModal }">
          <Button
            variant="destructive"
            @click="openModal"
            class="text-base font-bold mb-8"
            :disabled="disabled"
            hide-loader
          >
            Delete All Images
          </Button>
        </template>
      </Dialog>

      <Table v-if="!isLoading && product" class="min-w-[auto]" :headers="tableHeaders">
        <tr v-for="(img, idx) in product.productImages" :key="img.id">
          <td>{{ idx + 1 }}</td>
          <td>
            <img
              :src="img.imageUrl"
              alt="product image"
              class="w-[80px] h-[50px] mx-auto"
              loading="lazy"
            />
          </td>

          <td class="space-x-2 min-w-[105px]">
            <Dialog
              :action="() => handleDeleteImage(img.id, img.imageUrl)"
              :title="`Are you sure to delete image '${idx + 1}'`"
              description="you cannot retrieve this image after deleting it."
            >
              <template #trigger="{ openModal }">
                <Button
                  variant="destructive"
                  size="sm"
                  @click="openModal"
                  :disabled="disabled"
                  hide-loader
                >
                  <Trash :size="16" />
                </Button>
              </template>
            </Dialog>
          </td>
        </tr>
      </Table>
      <Spinner v-else />
      <ErrorMessage v-if="error" message="Something went wrong" />
      <h3
        v-if="product?.productImages?.length === 0"
        class="text-center text-xl text-gray-500"
      >
        No Images
      </h3>
    </div>
  </div>
</template>
