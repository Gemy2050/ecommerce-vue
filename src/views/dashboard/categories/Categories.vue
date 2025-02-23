<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Dialog from "@/components/ui/Dialog.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Input from "@/components/ui/Input.vue";
import PageTitle from "@/components/ui/PageTitle.vue";
import Spinner from "@/components/ui/Spinner.vue";
import Table from "@/components/ui/Table.vue";
import { useCategories } from "@/hooks/useCategories";
import { tableSearch } from "@/utils/functions";
import { PenBox, Trash } from "lucide-vue-next";

const {
  categoriesQuery: { data: categories, error },
  handleDeleteCategory,
  disabled,
} = useCategories();

const tableHeaders = ["name", "actions"];
</script>
<template>
  <div>
    <PageTitle>
      <h2 class="text-lg sm:text-2xl">Categories</h2>
    </PageTitle>

    <div class="mt-2 p-4 rounded-lg bg-background">
      <Button
        as="link"
        to="/dashboard/categories/add"
        rounded="md"
        class="text-base font-bold mb-8"
        data-aos="fade-up"
      >
        Add Category
      </Button>

      <Input
        type="search"
        placeholder="Search here ..."
        class="w-full mb-4"
        data-aos="fade-up"
        @input="tableSearch($event)"
      />

      <Table v-if="categories && !error" :headers="tableHeaders" class="min-w-[auto]">
        <tr v-for="(cat, idx) in categories" :key="cat.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ cat.name }}</td>

          <td className="space-x-2 min-w-[105px]">
            <Button as="link" :to="`/dashboard/categories/edit/${cat.id}`" size="sm">
              <PenBox :size="16" />
            </Button>

            <Dialog
              :title="`Are you sure to delete '${cat.name}' category?`"
              description="you cannot retrieve this category after deleting it."
              :action="() => handleDeleteCategory(cat.id)"
            >
              <template #trigger="{ openModal }">
                <Button
                  variant="destructive"
                  size="sm"
                  :disabled="disabled"
                  hide-loader
                  @click="openModal"
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
    </div>
  </div>
</template>
