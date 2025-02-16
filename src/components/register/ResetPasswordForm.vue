<script setup lang="ts">
import { RESET_FORM } from "@/data/forms";
import Input from "../ui/Input.vue";
import InputGroup from "../ui/InputGroup.vue";
import Button from "../ui/Button.vue";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { resetPasswordSchema } from "@/validation";
import { axiosInstance } from "@/config/axios.config";
import ErrorMessage from "../ui/ErrorMessage.vue";
import type { AxiosError } from "axios";
import type { IAxiosError } from "@/interfaces";

const { handleSubmit, defineField, errors, isSubmitting } = useForm({
  validationSchema: resetPasswordSchema,
});

const getInputData = (name: string) => {
  const [data] = defineField(name);
  return data;
};

const toast = useToast();
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  try {
    const data = { ...values, email: router.currentRoute.value.query.email };
    await axiosInstance.post("/account/resetPassword", { ...data });
    toast.success("Password reset successfully.");
    router.push("/login");
  } catch (error) {
    const message = (error as AxiosError<IAxiosError>).response?.data.message;
    toast.error(message || "Something went wrong, Please try again.");
  }
});
</script>

<template>
  <form
    className="w-[400px] max-w-full mx-auto md:mx-0"
    @submit.prevent="onSubmit"
  >
    <div data-aos="fade-right">
      <h2
        className="text-2xl md:text-3xl lg:text-4xl mb-2 font-semibold flex items-center gap-2"
      >
        Reset Password
      </h2>
      <p className="text-gray-400 mb-3">
        Enter the otp code and the new password
      </p>

      <InputGroup
        v-for="{ name, placeholder, type } in RESET_FORM"
        class="mb-2"
      >
        <label :for="name">{{ placeholder }}</label>
        <Input
          :type="type"
          :placeholder="placeholder"
          :id="name"
          class="p-3 mt-1 mb-3"
          required
          :maxlength="name === 'otp' ? 6 : 50"
          v-model="getInputData(name).value"
        />
        <ErrorMessage :message="errors[name]" />
      </InputGroup>

      <Button fullWidth :disabled="isSubmitting"> Submit </Button>
    </div>
  </form>
</template>
