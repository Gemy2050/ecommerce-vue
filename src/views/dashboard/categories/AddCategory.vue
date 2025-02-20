<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import { useCategories } from "@/hooks/useCategories";
import { CornerUpRight } from "lucide-vue-next";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const { disabled, handleAddCategory } = useCategories();
const name = ref("");
</script>
<template>
  <div>
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Add Category</h2>
      <RouterLink to=".">
        <CornerUpRight :size="40" />
      </RouterLink>
    </PageTitle>
    <div class="mt-2 p-5 pt-7 rounded-lg bg-background" data-aos="fade-up">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8">
        <InputGroup>
          <label for="name">category name</label>
          <Input id="name" type="text" v-model="name" />
        </InputGroup>
      </div>

      <Button
        rounded="md"
        class="mt-10 text-base font-bold w-[200px]"
        :disabled="disabled"
        @click="handleAddCategory(name)"
      >
        Add Category
      </Button>
    </div>
  </div>
</template>
