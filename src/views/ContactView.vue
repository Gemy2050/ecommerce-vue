<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { SOCIAL_LINKS } from "@/data/links";
import { CONTACT_FORM } from "@/data/forms";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Input from "@/components/ui/Input.vue";
import Textarea from "@/components/ui/Textarea.vue";
import { useForm } from "vee-validate";
import type { IAxiosError, IContactForm } from "@/interfaces";
import { contactSchema } from "@/validation";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import { addObjectToFormData } from "@/utils/functions";
import { axiosFormData } from "@/config/axios.config";

const { errors, defineField, handleSubmit, isSubmitting, resetForm } =
  useForm<IContactForm>({
    validationSchema: contactSchema,
  });
const toast = useToast();

const getInputData = (name: keyof IContactForm) => {
  const [data] = defineField(name);
  return data;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = addObjectToFormData(values);
    await axiosFormData.post("/contact", formData);
    toast.success("Message sent successfully.");
    resetForm();
  } catch (err) {
    const message = (err as AxiosError<IAxiosError>).response?.data.message;
    toast.error(message || "Something went wrong");
  }
});
</script>

<template>
  <main class="min-h-screen justify-center">
    <div class="container flex-col md:flex-row justify-center gap-8 p-4">
      <h1
        class="text-[28px] mt-4 w-full flex-1 flex-shrink-0 sm:text-[40px] text-center font-semibold mb-8"
        data-aos="fade-left"
      >
        Contact Us
      </h1>
      <div
        class="flex flex-col md:flex-row justify-center gap-8 md:gap-10 w-full max-w-"
      >
        <div
          class="flex self-center md:self-auto w-[450px] md:w-auto max-w-full flex-row md:flex-col gap-5 justify-between"
        >
          <a
            v-for="{ name, link, icon } in SOCIAL_LINKS"
            :key="name"
            :href="link"
            class="[&:hover>svg]:rotate-[360deg] flex justify-center items-center w-[50px] h-[50px] rounded-md bg-background border border-gray-300 hover:border-primary hover:ring-2 hover:ring-primary hover:shadow-xl hover:shadow-primary duration-300"
            target="_blank"
            rel="noopener"
            data-aos="zoom-in"
          >
            <component :is="icon" class="duration-500" :size="30" />
          </a>
        </div>
        <form
          class="self-center space-y-4 w-[450px] max-w-full"
          data-aos="fade-right"
          @submit.prevent="onSubmit"
        >
          <div key="{name}" v-for="{ name, placeholder, type } in CONTACT_FORM">
            <Textarea
              :placeholder="placeholder"
              :name="name"
              v-if="type === 'textarea'"
              class="h-[180px] resize-none"
              v-model="getInputData(name as keyof IContactForm).value"
            ></Textarea>
            <Input
              :placeholder="placeholder"
              :name="name"
              :type="type"
              v-model="getInputData(name as keyof IContactForm).value"
              v-else
            />
            <ErrorMessage :message="errors[name as keyof IContactForm]" />
          </div>

          <Button type="submit" size="md" fullWidth :disabled="isSubmitting">
            Send Message
          </Button>
        </form>
      </div>
    </div>
    <img
      src="/imgs/square.svg"
      class="w-[150px] md:w-[200px] hidden md:block fixed bottom-0 right-[-40px] z-[-1]"
      alt="square shape"
    />
    <img
      src="/imgs/square.svg"
      class="w-[150px] md:w-[200px] hidden md:block fixed top-0 left-0 z-[-1] rotate-180"
      alt="square shape"
    />
  </main>
</template>
