<script setup lang="ts">
import { computed, toRefs } from "vue";
import Button from "./Button.vue";

const props = defineProps<{
  pageIndex: number;
  data: { count: number; pageSize: number } | undefined;
  scrollToTop?: HTMLElement | null;
}>();

const emit = defineEmits(["pageIndexChange"]);

const { data, pageIndex, scrollToTop } = toRefs(props);

const totalCount = computed(() => {
  if (!data.value) return 0;
  return Math.ceil(data.value?.count! / data.value?.pageSize!);
});

const prevHandler = () => {
  emit("pageIndexChange", pageIndex.value - 1);
  if (scrollToTop) {
    scrollToTop.value?.scrollIntoView();
  }
};
const nextHandler = () => {
  emit("pageIndexChange", pageIndex.value + 1);
  if (scrollToTop) scrollToTop.value?.scrollIntoView();
};
</script>

<template>
  <div className="flex justify-between items-center mt-3" v-if="data">
    <Button @click="prevHandler" :disabled="pageIndex == 1" :hide-loader="true">
      Prev
    </Button>
    <span> {{ pageIndex }} of {{ totalCount }} </span>

    <Button
      @click="nextHandler"
      :disabled="data ? pageIndex == totalCount : true"
      :hide-loader="true"
    >
      Next
    </Button>
  </div>
</template>
