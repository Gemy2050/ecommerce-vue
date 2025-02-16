<script setup lang="ts">
import EmailForm from "@/components/register/EmailForm.vue";
import RegisterHeader from "@/components/register/RegisterHeader.vue";
import ResetPasswordForm from "@/components/register/ResetPasswordForm.vue";
</script>
<template>
  <RegisterHeader />
  <main class="relative pt-32 pb-10">
    <img
      class="fixed top-5 w-full h-[150px] z-[-1]"
      src="/imgs/pill-shape.png"
      alt="shape"
      width="{100}"
      height="{200}"
    />
    <div class="container pt-8 pb-5 rounded-lg">
      <div
        class="mt-5 flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-28"
      >
        <ResetPasswordForm v-if="$route.query.form === 'resetPassword'" />
        <EmailForm v-else />
        <img
          src="/imgs/forget-password.png"
          alt="forget password"
          class="hidden md:block md:w-[350px] xl:w-[400px] max-w-full mx-auto md:mx-0"
          width="400"
          height="200"
          data-aos="fade-left"
        />
      </div>
    </div>
  </main>
</template>
