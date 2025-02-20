import { axiosInstance } from "@/config/axios.config";
import type { User } from "@/types";
import Cookies from "js-cookie";

export const resendOTPCode = async (email: string) => {
  if (!email) return;

  await axiosInstance.get(`/account/resend-otp?email=${email}`);
};

export const verifyUser = async () => {
  try {
    const user = JSON.parse(Cookies.get("user") || "") as User;
    if (!user) return;

    const response = await axiosInstance.get(
      `/account/verify-token?isGoogleProvider=${user.isGoogleUser || ""}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return false;
  }
};
