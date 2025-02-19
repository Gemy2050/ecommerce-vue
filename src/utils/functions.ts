import type { IProduct } from "@/interfaces";

export function getTotalPrice(cart: IProduct[]) {
  return cart
    .reduce((acc, item) => {
      return acc + item.quantity! * item.price;
    }, 0)
    .toFixed(2);
}

export const getImageURL = (imageValue: File | string): string => {
  if (typeof imageValue === "string") {
    return imageValue;
  }

  if (imageValue) {
    return URL.createObjectURL(imageValue);
  }

  return "";
};

export const addObjectToFormData = (object: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    formData.append(key, object[key]);
  });
  return formData;
};

export const tableSearch = (e: InputEvent) => {
  const searchValue = (e.target as HTMLInputElement).value;
  const rows = document.querySelectorAll("tbody tr");
  rows?.forEach((row: any) => {
    if (row.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
      row.classList.remove("hidden");
    } else {
      row.classList.add("hidden");
    }
  });
};

export const getStatusColor = (status: string) => {
  const colors = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};
