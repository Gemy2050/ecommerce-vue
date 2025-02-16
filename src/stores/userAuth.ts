import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@/interfaces";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export const useUserAuth = defineStore("counter", () => {
  const user = ref<IUser | null>(null);
  const router = useRouter();

  function setUser(userData: IUser) {
    user.value = userData;
    Cookies.set("token", userData.token, { expires: 3 });
    Cookies.set("user", JSON.stringify(userData), { expires: 3 });
  }

  function getStoredUser() {
    const userFromCookies = Cookies.get("user");
    const token = Cookies.get("token");
    if (userFromCookies && token) {
      user.value = JSON.parse(userFromCookies);
    } else {
      logout();
    }
  }

  function logout() {
    user.value = null;
    Cookies.remove("token");
    Cookies.remove("user");
    router.push({ path: "/login", replace: true });
  }

  return { user, setUser, getStoredUser, logout };
});
