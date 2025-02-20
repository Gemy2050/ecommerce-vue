import { DollarSign, Package, ShoppingCart, Users } from "lucide-vue-next";

export const ANALYTICS = [
  {
    title: "Revenue",
    label: "totalRevenue",
    icon: DollarSign,
    color: "text-blue-500",
    bg: "bg-blue-100",
    border: "border-l-blue-500",
  },
  {
    title: "Orders",
    label: "totalOrders",
    icon: ShoppingCart,
    color: "text-green-500",
    bg: "bg-green-100",
    border: "border-l-green-500",
  },
  {
    title: "Products",
    label: "totalProducts",
    icon: Package,
    color: "text-red-500",
    bg: "bg-red-100",
    border: "border-l-red-500",
  },
  {
    title: "Customers",
    label: "totalCustomers",
    icon: Users,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    border: "border-l-yellow-500",
  },
];
