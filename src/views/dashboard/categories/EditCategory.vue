<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import Loader from "@/components/ui/Loader.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import { useCategories } from "@/hooks/useCategories";
import { CornerUpRight } from "lucide-vue-next";
import { ref, watchEffect } from "vue";
import { RouterLink, useRouter } from "vue-router";

const {
  categoriesQuery: { data: categories, isLoading },
  handleEditCategory,
  disabled,
} = useCategories();
const router = useRouter();
const catId = router.currentRoute.value.params.id as string;

const name = ref<undefined | string>(undefined);

watchEffect(() => {
  if (!name.value) {
    name.value = categories.value?.find((cat) => cat.id === catId)?.name;
  }

  if (!isLoading.value && !name.value) {
    router.replace("/dashboard/categories");
  }
});
</script>
<template>
  <Loader v-if="!name" />
  <main v-else>
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Edit Category</h2>
      <RouterLink to="..">
        <CornerUpRight :size="40" />
      </RouterLink>
    </PageTitle>
    <div class="mt-2 p-5 pt-7 rounded-lg bg-background" data-aos="fade-up">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8"
      >
        <InputGroup>
          <label for="name">category name</label>
          <Input id="name" type="text" v-model="name" />
        </InputGroup>
      </div>

      <Button
        rounded="md"
        class="mt-10 text-base font-bold w-[200px]"
        :disabled="disabled"
        @click="handleEditCategory(catId, name)"
      >
        Updated Category
      </Button>
    </div>
  </main>
</template>
