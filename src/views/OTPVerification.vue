<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Logo from "@/components/ui/Logo.vue";
import { axiosInstance } from "@/config/axios.config";
import type { IAxiosError } from "@/interfaces";
import { resendOTPCode } from "@/services";
import type { AxiosError } from "axios";
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const INPUTS_LENGTH = 6;
const otp = ref<string[]>(Array(INPUTS_LENGTH).fill(""));
const disabled = ref(false);

if (!window.history.state?.email) {
  router.push({ name: "login", replace: true });
}

onUnmounted(() => {
  window.history.state.email = null;
});

const handleChange = (e: InputEvent, index: number) => {
  const input = e.target as HTMLInputElement;
  const value = input.value;

  if (!/^[0-9]{1}$/.test(value)) {
    input.value = input.value.slice(0, 1);
    return;
  }

  const newOtp = [...otp.value];
  newOtp[index] = value;
  otp.value = newOtp;

  const next = input.nextElementSibling as HTMLInputElement;
  if (next) {
    next.focus();
  }
};

const handleKeyDown = (e: KeyboardEvent, index: number) => {
  const input = e.target as HTMLInputElement;
  if (input.value && e.key === "Backspace") {
    const newOtp = [...otp.value];
    newOtp[index] = "";
    otp.value = newOtp;
  } else if (!input.value && e.key === "Backspace") {
    const prev = input.previousElementSibling as HTMLInputElement;
    if (prev) {
      prev.focus();
    }
  }
};

const resendCode = () => {
  try {
    const email = window.history.state.email;
    resendOTPCode(email);
    toast.success("Code has been sent to your email");
  } catch (error) {
    toast.error("Error sending otp code");
  }
};

const handleSubmit = async () => {
  try {
    const code = otp.value.join("");
    const email = window.history.state.email;
    if (code.length !== INPUTS_LENGTH) {
      return;
    }

    disabled.value = true;

    await axiosInstance.post("/account/verify-otp", {
      email,
      otp: code,
    });

    toast.success("Email is Verified");

    router.push({ name: "login", replace: true });
  } catch (error) {
    const message = (error as AxiosError<IAxiosError>).response?.data.message;
    toast.error(message || "Verification Failed");
  } finally {
    otp.value = Array(INPUTS_LENGTH).fill("");
    disabled.value = false;
  }
};
</script>

<template>
  <div class="relative container py-5 min-h-screen w-full">
    <form
      class="flex flex-col text-center gap-3 w-[470px] mx-auto max-w-full"
      data-aos="fade-up"
      @submit.prevent="handleSubmit"
    >
      <Logo class="text-3xl" />
      <img src="/imgs/verify.png" class="w-[150px] mx-auto" alt="verification code" />
      <h3 class="text-lg">
        Enter 6 digits code that you have received on email before Time expiration
      </h3>
      <div class="flex gap-2 sm:gap-4 mt-5 justify-center">
        <Input
          v-for="(input, index) in otp"
          :key="index"
          v-model="otp[index]"
          type="number"
          class="!w-[40px] h-[40px] sm:!w-[50px] sm:h-[50px] text-center text-xl sm:text-2xl font-bold border-primary"
          required
          :autoFocus="index === 0"
          placeholder="*"
          :id="`otp-${index}`"
          @input="handleChange($event, index)"
          @keydown="handleKeyDown($event, index)"
        />
      </div>

      <div class="mb-4">
        <p>
          Don't receive code?
          <Button variant="link" class="p-0" size="sm" type="button" @click="resendCode">
            Resend
          </Button>
        </p>
      </div>

      <Button
        size="md"
        rounded="md"
        class="w-fit px-24 mx-auto border disabled:cursor-no-drop"
        :disabled="otp.length !== INPUTS_LENGTH || disabled"
      >
        Verify OTP Code
      </Button>
    </form>
    <img
      src="/imgs/square.svg"
      class="w-[150px] md:w-[200px] fixed bottom-0 right-0 z-[-1]"
      alt="square shape"
    />
    <img
      src="/imgs/square.svg"
      class="w-[150px] md:w-[200px] fixed top-0 left-0 z-[-1] rotate-180"
      alt="square shape"
    />
  </div>
</template>
