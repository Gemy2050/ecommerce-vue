<template>
  <div
    v-for="num in 8"
    :key="num"
    class="animate-pulse bg-gray-400 rounded-lg p-4"
    data-aos="fade-up"
  >
    <div class="h-48 w-full bg-gray-500 rounded-lg mb-4"></div>
    <div class="h-4 w-full bg-gray-500 rounded mb-2"></div>
    <div class="h-4 w-full bg-gray-500 rounded mb-5"></div>
    <div class="h-4 w-full bg-gray-500 rounded mb-2"></div>
    <div class="h-4 w-full bg-gray-500 rounded mb-5"></div>
    <div class="h-4 w-full bg-gray-500 rounded mb-2"></div>
  </div>
</template>
