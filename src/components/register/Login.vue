<script setup lang="ts">
import { EyeClosed, EyeIcon } from "lucide-vue-next";
import Button from "../ui/Button.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";
import Input from "../ui/Input.vue";
import { ref } from "vue";
import InputGroup from "../ui/InputGroup.vue";
import { useForm } from "vee-validate";
import { loginSchema } from "@/validation";
import type { IAxiosError, ILoginForm } from "@/interfaces";
import { axiosInstance } from "@/config/axios.config";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useUserAuth } from "@/stores/userAuth";
import { GoogleLogin } from "vue3-google-login";

const { handleSubmit, defineField, errors, isSubmitting } = useForm<ILoginForm>(
  {
    validationSchema: loginSchema,
  }
);

const toast = useToast();
const router = useRouter();
const userAuth = useUserAuth();

const isDisabled = ref(false);

const [email] = defineField("email");
const [password] = defineField("password");
const passwordType = ref("password");

const togglePasswordType = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const { data } = await axiosInstance.post("/account/login", values);
    toast.success("Login successful");
    userAuth.setUser(data);
    const redirectTo =
      (router.currentRoute.value.query.target as string) || "/";
    router.push({ path: redirectTo, replace: true });
  } catch (error) {
    const message = (error as AxiosError<IAxiosError>).response?.data.message;
    toast.error(message || "Login Failed");
    if (message === "Email is not confirmed") {
      axiosInstance.get(`/account/resend-otp?email=${values.email}`);
      router.push({
        name: "otpVerification",
        state: { email: values.email },
        query: { email: values.email },
        replace: true,
      });
    }
  }
});

const handleGoogleLoginSuccess = async (credentialResponse: any) => {
  try {
    isDisabled.value = true;

    console.log(credentialResponse);

    const tokenId = credentialResponse.credential;
    // Send token to backend API to verify and handle login
    const { status, data } = await axiosInstance.post(
      "/account/google-signin",
      { idToken: tokenId }
    );

    if (status === 200) {
      userAuth.setUser({ ...data.returnedUser, isGoogleUser: true });
      router.replace("/");
    }
  } catch (error) {
    const axiosError = error as AxiosError<IAxiosError>;
    toast({
      title: axiosError.response?.data.message || "Something went wrong",
      variant: "destructive",
    });
  } finally {
    isDisabled.value = false;
  }
};

const handleGoogleLoginFailure = () => {
  toast.error("Login failed with Google");
};
</script>

<template>
  <form
    class="flex flex-col gap-4 w-[400px] max-w-full mx-auto md:mx-0"
    data-aos="fade-right"
    @submit.prevent="onSubmit"
  >
    <InputGroup class="mb-3">
      <label htmlFor="email">Email</label>
      <Input
        type="email"
        placeholder="email@example.com"
        id="email"
        name="email"
        class="p-3 mt-1"
        v-model="email"
        @update:modelValue="(value) => (email = value)"
      />
      <ErrorMessage :message="errors['email']" />
    </InputGroup>

    <InputGroup>
      <label htmlFor="password">Password</label>
      <div class="relative">
        <Input
          :type="passwordType"
          placeholder="********"
          id="password"
          name="password"
          class="p-3 pe-[35px] mt-1"
          v-model="password"
          @update:modelValue="(value) => (password = value)"
        />
        <EyeIcon
          @click="togglePasswordType"
          class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          v-if="passwordType === 'password'"
        />
        <EyeClosed
          @click="togglePasswordType"
          class="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          v-else
        />
      </div>
      <ErrorMessage :message="errors['password']" />
    </InputGroup>
    <RouterLink to="/forget-password" class="ms-auto w-fit -mt-2">
      Forget Password?
    </RouterLink>
    <Button
      size="md"
      rounded="lg"
      class="border-[#DADADA] border my-1"
      :disabled="isSubmitting || isDisabled"
    >
      Sign in
    </Button>

    <div class="mt-4 flex items-center gap-4">
      <hr class="w-full" />
      <span>or</span>
      <hr class="w-full" />
    </div>
    <div
      class="relative mt-5 flex items-center justify-center gap-10 rounded-[10px] [&:hover>button]:text-primary duration-300"
    >
      <Button
        type="button"
        variant="outline"
        rounded="full"
        fullWidth
        class="gap-4"
        :disabled="isSubmitting"
      >
        <img
          src="/imgs/google.svg"
          alt="google"
          class="w-6"
          width="24"
          height="24"
        />
        Continue with Google
      </Button>

      <div className=" absolute top-0 left-0 w-full h-full opacity-0 ">
        <GoogleLogin
          class="w-full h-full"
          :callback="handleGoogleLoginSuccess"
        />
      </div>
    </div>
  </form>
</template>
