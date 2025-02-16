import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import OTPVerification from "@/views/OTPVerification.vue";
import ForgetPassword from "@/views/ForgetPassword.vue";
import Cookies from "js-cookie";
import ProductsList from "@/components/product/ProductsList.vue";
import ContactView from "@/views/ContactView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import OrdersView from "@/views/OrdersView.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import CartView from "@/views/CartView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SuccessView from "@/views/SuccessView.vue";
import { useUserAuth } from "@/stores/userAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: function () {
    return { top: 0, behavior: "auto" };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: RegisterView,
      meta: { auth: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: RegisterView,
      meta: { auth: true },
    },
    {
      path: "/otp-verification",
      name: "otpVerification",
      component: OTPVerification,
      meta: { auth: true },
    },
    {
      path: "/forget-password",
      name: "forgetPassword",
      component: ForgetPassword,
      meta: { auth: true },
    },
    {
      path: "/products",
      name: "products",
      component: ProductsList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/product/:id",
      name: "productDetails",
      component: ProductDetails,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
      meta: { requiresAuth: true },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/success",
      name: "sucess",
      component: SuccessView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, _, next) => {
  const userAuth = useUserAuth();
  const isAuthenticated = !!userAuth.user;
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  if (to.meta.auth && isAuthenticated) {
    return next("/");
  }

  next();
});
export default router;
