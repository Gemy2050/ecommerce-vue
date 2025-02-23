<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import { axiosFormData } from "@/config/axios.config";
import { getImageURL } from "@/utils/functions";
import { useQueryClient } from "@tanstack/vue-query";
import { CornerUpRight } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const images = ref<File[]>([]);
const disabled = ref(false);

const QyeryClient = useQueryClient();
const toast = useToast();
const router = useRouter();
const productId = router.currentRoute.value.params.id;

const handleInputChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    images.value = [...images.value, ...Array.from(files)];
  }
};

async function addProductImages() {
  try {
    disabled.value = true;

    const formData = new FormData();
    images.value.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("productId", String(productId));

    await axiosFormData.post("/productImage/add-many-images", formData);

    images.value = [];
    QyeryClient.invalidateQueries({ queryKey: ["get-products"] });
    toast.success("Product images added successfully");
    router.push(".");
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    disabled.value = false;
  }
}

const deleteImage = (index: number) => {
  images.value = images.value.filter((_, i) => i !== index);
};
</script>

<template>
  <div>
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Add Product Images</h2>
      <RouterLink relative="path" to=".">
        <CornerUpRight :size="40" />
      </RouterLink>
    </PageTitle>
    <div class="mt-2 p-5 pt-7 rounded-lg bg-background" data-aos="fade-up">
      <div class="mb-5">
        <label
          htmlFor="imageInput"
          class="bg-gray-500 w-[100px] h-[100px] text-[50px] flex items-center justify-center text-white cursor-pointer rounded-sm"
        >
          +
        </label>
        <input
          id="imageInput"
          type="file"
          class="hidden"
          multiple
          @change="handleInputChange($event)"
        />
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8"
      >
        <div v-for="(img, idx) in images" :key="idx" class="relative">
          <img
            :src="getImageURL(img)"
            alt="product"
            class="h-[150px] w-full rounded-sm"
          />
          <button
            class="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 text-sm flex items-center justify-center p-1 rounded-full"
            @click="deleteImage(idx)"
          >
            x
          </button>
        </div>
      </div>

      <Button
        class="mt-10 text-base font-bold min-w-[160px]"
        @click="addProductImages"
        :disabled="disabled"
      >
        Add Images
      </Button>
    </div>
  </div>
</template>
