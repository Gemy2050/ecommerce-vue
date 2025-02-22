import { productFormSchema, type ProductFormSchema } from "@/validation";
import { useForm } from "vee-validate";

export function useProductForm() {
  const formMethods = useForm<ProductFormSchema>({
    validationSchema: productFormSchema,
    initialValues: {
      name: "",
      description: "",
      price: 0,
      hasDiscount: "No",
      discount: 0,
      productCategoryId: "",
      image: undefined,
      imageUrl: "",
      colors: [
        {
          id: 0,
          color: "",
          sizes: [{ id: 0, size: "", quantity: "" }],
        },
      ],
    },
  });

  return formMethods;
}
