<script setup lang="ts">
const props = defineProps<{
  headers: string[];
  class?: string;
}>();
</script>

<template>
  <div
    class="relative text-sm overflow-x-scroll text-gray-700"
    id="customTable"
    data-aos="fade-up"
  >
    <table
      :class="`rounded-2xl overflow-hidden w-full min-w-[1000px] lg:min-w-full ${props.class}`"
    >
      <thead class="bg-[#666] dark:bg-[#292828] text-white">
        <tr>
          <th class="capitalize p-4 font-bold">#</th>
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="capitalize p-4 font-bold"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody
        class="[&>tr]:border-b [&>tr]:dark:bg-[#111] [&>tr]:dark:text-gray-300 [&>tr]:dark:!border-gray-800"
      >
        <slot />
      </tbody>
    </table>
  </div>
</template>
