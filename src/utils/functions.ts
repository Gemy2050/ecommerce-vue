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
