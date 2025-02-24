<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import Input from "@/components/ui/Input.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import Popup from "@/components/ui/Popup.vue";
import { axiosFormData } from "@/config/axios.config";
import { PROFILE_FORM } from "@/data/forms";
import type { IAxiosError, IUser } from "@/interfaces";
import { useUserAuth } from "@/stores/userAuth";
import { addObjectToFormData, getImageURL } from "@/utils/functions";
import { profileSchema, type ProfileFormData } from "@/validation";
import type { AxiosError } from "axios";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";

const { user, setUser } = useUserAuth();
const { errors, defineField, handleSubmit, isSubmitting } =
  useForm<ProfileFormData>({
    validationSchema: profileSchema,
    initialValues: {
      firstName: user!.firstName,
      secondName: user!.secondName,
      phone: user!.phone || "",
      address: user!.address || "",
      image: user!.image,
    },
  });
const toast = useToast();

const getInputData = (name: keyof ProfileFormData) => {
  const [data] = defineField(name);
  return data;
};

const handleClearImage = () => {
  getInputData("image").value = "";
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const sameData = Object.entries(values).every(
      ([key, value]) => value === user![key as keyof IUser]
    );

    if (sameData) {
      toast("No Change in Your Information");
      return;
    }

    const dataObject = { ...values, isGoogleUser: user!.isGoogleUser };
    const formData = addObjectToFormData(dataObject);
    formData.append("id", user!.id);
    const { data } = await axiosFormData.put(
      "/account/update-profile",
      formData
    );
    setUser(data);
    toast.success("Account updated successfully.");
  } catch (err) {
    const message = (err as AxiosError<IAxiosError>).response?.data.message;
    toast.error(message || "Something went wrong, Please try again.");
  }
});
</script>
<template>
  <main
    class="container min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-72px)] relative mx-auto py-8"
  >
    <h1
      class="text-[28px] sm:text-[40px] text-center md:text-start font-semibold mb-8"
      data-aos="fade-left"
    >
      Profile Info
    </h1>

    <form
      class="flex justify-between flex-wrap gap-5 w-[470px] max-w-full mx-auto md:mx-0"
      data-aos="fade-right"
      @submit.prevent="onSubmit"
    >
      <div
        v-for="{ name, placeholder, type } in PROFILE_FORM"
        :key="name"
        :class="`${
          ['firstName', 'secondName'].includes(name) ? 'w-full sm:w-[47.5%]' : 'w-full'
        }`"
      >
        <InputGroup
          :file="name === 'image' ? getInputData(name).value as File : null"
          :imgUrl="name === 'image' ? user?.image : ''"
          @clear="handleClearImage"
        >
          <label :for="name">{{ placeholder }}</label>
          <Input
            :type="type"
            :placeholder="placeholder"
            v-model="getInputData(name).value"
          />
        </InputGroup>
        <ErrorMessage :message="errors[name]" />
      </div>

      <Button
        size="md"
        class="disabled:cursor-no-drop disabled:opacity-60 w-full"
        :disabled="isSubmitting"
      >
        Update Profile
      </Button>
    </form>

    <Popup>
      <img
        :src="getImageURL(getInputData('image').value as string|File)"
        alt="user image"
      />
    </Popup>
    <img
      src="/imgs/circle.svg"
      class="hidden md:block w-[120px] fixed top-32 right-0 z-[-1]"
      alt="circle"
      width="120"
      height="185"
    />
    <img
      src="/imgs/square.svg"
      class="hidden md:block md:w-[200px] fixed bottom-0 right-0 z-[-1]"
      alt="square shape"
      width="200"
      height="215"
    />
  </main>
</template>
