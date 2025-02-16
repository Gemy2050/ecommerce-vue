<script setup lang="ts">
import { reactive, ref } from "vue";
import Button from "../ui/Button.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";
import Input from "../ui/Input.vue";
import { resendOTPCode } from "@/services";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import type { IAxiosError } from "@/interfaces";
import { useRouter } from "vue-router";

const toast = useToast();
const email = ref("");
const formStatus = reactive({
  isSubmitting: false,
  isError: false,
});
const router = useRouter();

const submitForm = async () => {
  try {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!reg.test(email.value)) {
      formStatus.isError = true;
      return;
    }
    formStatus.isSubmitting = true;
    formStatus.isError = false;

    // send email to server
    await resendOTPCode(email.value);

    toast.success("Email sent successfully");
    // change query params to resetPassword
    router.push({
      query: { form: "resetPassword", email: email.value },
      state: { email: email.value },
      replace: true,
    });
  } catch (error) {
    const message = (error as AxiosError<IAxiosError>).response?.data.message;
    toast.error(message);
  } finally {
    formStatus.isSubmitting = false;
  }
};
</script>

<template>
  <form
    class="w-[400px] max-w-full mx-auto md:mx-0"
    @submit.prevent="submitForm"
  >
    <div data-aos="fade-right">
      <h2
        class="text-2xl md:text-3xl lg:text-4xl my-2 font-semibold flex items-center gap-2"
      >
        Forget Password
      </h2>
      <p class="text-gray-400 mb-3">Enter you email to recover password</p>
      <label htmlFor="email">Email</label>
      <Input
        type="email"
        placeholder="your email"
        id="email"
        class="p-3 mt-1"
        required
        v-model="email"
      />
      <ErrorMessage message="Email is no valid" v-if="formStatus.isError" />
      <Button fullWidth class="mt-3" :disabled="formStatus.isSubmitting">
        Submit
      </Button>
    </div>
  </form>
</template>
