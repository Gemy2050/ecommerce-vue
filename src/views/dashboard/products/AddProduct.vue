<script setup lang="ts">
import ProductsForm from "@/components/dashboard/ProductsForm.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import { CornerUpRight } from "lucide-vue-next";

import { RouterLink } from "vue-router";
</script>

<template>
  <main className="p-0">
    <PageTitle>
      <h2 className="text-lg sm:text-2xl">Add Product</h2>
      <RouterLink to=".">
        <CornerUpRight :size="40" />
      </RouterLink>
    </PageTitle>

    <ProductsForm />
  </main>
</template>
