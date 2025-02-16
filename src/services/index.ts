import { axiosInstance } from "@/config/axios.config";

export const resendOTPCode = async (email: string) => {
  if (!email) return;

  await axiosInstance.get(`/account/resend-otp?email=${email}`);
};
