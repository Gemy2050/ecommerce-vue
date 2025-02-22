import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import ProductsList from "@/components/product/ProductsList.vue";
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
      component: () => import("@/views/auth/OTPVerification.vue"),
      meta: { auth: true },
    },
    {
      path: "/forget-password",
      name: "forgetPassword",
      component: () => import("@/views/auth/ForgetPassword.vue"),
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
      component: () => import("@/views/product/ProductDetails.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("@/views/FavoritesView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("@/views/order/OrdersView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/success",
      name: "sucess",
      component: () => import("@/views/order/SuccessView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/layouts/DashboardLayout.vue"),
      meta: { admin: true },
      children: [
        { path: "", name: "dashboard-index", redirect: "/dashboard/home" },
        {
          path: "home",
          name: "dashboardHome",
          component: () => import("@/views/dashboard/Home.vue"),
        },
        {
          path: "categories",
          name: "categiories",
          component: () =>
            import("@/views/dashboard/categories/Categories.vue"),
        },
        {
          path: "categories/add",
          name: "categories-add",
          component: () =>
            import("@/views/dashboard/categories/AddCategory.vue"),
        },
        {
          path: "categories/edit/:id",
          name: "categories-edit",
          component: () =>
            import("@/views/dashboard/categories/EditCategory.vue"),
        },
        {
          path: "products",
          name: "products-index",
          component: () => import("@/views/dashboard/products/Products.vue"),
        },
        {
          path: "products/add",
          name: "products-add",
          component: () => import("@/views/dashboard/products/AddProduct.vue"),
        },
        {
          path: "products/edit/:id",
          name: "products-edit",
          component: () => import("@/views/dashboard/products/EditProduct.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
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
