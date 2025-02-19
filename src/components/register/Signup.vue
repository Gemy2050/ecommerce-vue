<script setup lang="ts">
import Button from "../ui/Button.vue";
import { registerSchema } from "@/validation";
import InputGroup from "../ui/InputGroup.vue";
import { REGISTER_FORM } from "@/data/forms";
import Input from "../ui/Input.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";
import Popup from "../ui/Popup.vue";
import type { IAxiosError, IRegisterForm } from "@/interfaces";
import { useForm } from "vee-validate";
import { addObjectToFormData, getImageURL } from "@/utils/functions";
import { useToast } from "vue-toastification";
import { axiosFormData } from "@/config/axios.config";
import { useRouter } from "vue-router";
import type { AxiosError } from "axios";

const { errors, defineField, handleSubmit, isSubmitting } =
  useForm<IRegisterForm>({
    validationSchema: registerSchema,
  });
const toast = useToast();
const router = useRouter();

const getInputData = (name: keyof IRegisterForm) => {
  const [data] = defineField(name);
  return data;
};

const handleClearImage = () => {
  getInputData("image").value = "";
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = addObjectToFormData(values);
    await axiosFormData.post("/account/register", formData);
    toast.success("Account created successfully.");
    router.push({
      path: "/otp-verification",
      state: { email: values.email },
      replace: true,
    });
  } catch (err) {
    const message = (err as AxiosError<IAxiosError>).response?.data.message;
    toast.error(message || "Something went wrong, Please try again.");
  }
});
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="flex justify-between flex-wrap gap-3 w-[470px] max-w-full mx-auto md:mx-0"
    data-aos="fade-right"
  >
    <InputGroup
      :class="['firstName', 'secondName'].includes(name) ? 'w-[47%]' : 'w-full'"
      v-for="{ name, type, placeholder } in REGISTER_FORM"
      :key="name"
      :file="name === 'image' ? getInputData(name).value as File : null"
      @clear="handleClearImage"
    >
      <label :htmlFor="name">{{ placeholder }}</label>
      <Input
        :type="type"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :accept="type === 'file' ? 'image/*' : ''"
        class="border !p-2 rounded w-full"
        v-model="getInputData(name).value"
      />
      <ErrorMessage :message="errors[name]" />
    </InputGroup>

    <Button
      size="md"
      rounded="lg"
      class="border disabled:cursor-no-drop disabled:opacity-60 w-full"
      :disabled="isSubmitting"
    >
      Sign up
    </Button>
  </form>
  <Popup>
    <img
      :src="getImageURL(getInputData('image').value)"
      alt="view profile image"
      loading="lazy"
    />
  </Popup>
</template>
