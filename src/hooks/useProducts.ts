import { axiosFormData, axiosInstance } from "@/config/axios.config";
import type { IProduct, IQuery } from "@/interfaces";
import { addObjectToFormData } from "@/utils/functions";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref, watchEffect } from "vue";
import { useToast } from "vue-toastification";
import { useCategories } from "./useCategories";
import type { ProductFormSchema } from "@/validation";
import { useProductForm } from "./useProductForm";
import { useProdutsStore } from "@/stores/products";

export function useProducts() {
  const PAGE_SIZE = 10;
  const initialIndex = +(sessionStorage.getItem("productsIndex") || 1);

  const pageIndex = ref(initialIndex);
  const disabled = ref(false);

  const productsStore = useProdutsStore();
  const toast = useToast();
  const queryClient = useQueryClient();

  const formMethods = useProductForm();
  const { setFieldValue, values } = formMethods;

  const {
    categoriesQuery: { data: categories },
  } = useCategories();

  const queryKey = computed(() => ["get-products", pageIndex.value]);

  const productsQuery = useQuery<IQuery<IProduct>>({
    queryKey,
    queryFn: async () =>
      (
        await axiosInstance(
          `/product/get-all-products?pageSize=${PAGE_SIZE}&pageIndex=${pageIndex.value}`
        )
      ).data,
    enabled: !productsStore.products.length,
  });

  watchEffect(() => {
    if (productsQuery.data.value) {
      productsStore.setProducts(productsQuery.data.value.data);
    }
  });

  const addNewColorBox = () => {
    const updatedColors = [...values.colors!];

    updatedColors.push({
      id: Date.now(),
      color: "",
      sizes: [{ id: Date.now(), size: "", quantity: "" }],
    });

    setFieldValue("colors", updatedColors);
  };

  const handleAddProduct = async (productFormData: ProductFormSchema) => {
    try {
      disabled.value = true;
      const productCategory =
        categories.value?.find(
          (el) => el.id == productFormData.productCategoryId
        )?.name || "";

      const image =
        productFormData.image instanceof File
          ? productFormData.image
          : productFormData.image;

      const data = {
        ...productFormData,
        image,
        productCategory,
        priceBeforeDiscount:
          +productFormData.price + Number(productFormData.discount || 0),
        hasDiscount:
          productFormData.hasDiscount === "Yes" &&
          Number(productFormData.discount) > 0,
        variantsDto: JSON.stringify(productFormData.colors),
      };

      const formData = addObjectToFormData(data);

      // Add Product
      await axiosFormData.post("/product/add-product", formData);

      toast.success("Product added successfully");

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "getAllProducts" ||
          query.queryKey[0] === "getAnalytics",
      });
      return true;
    } catch (error) {
      toast.error("Failed to add product");
      return false;
    } finally {
      disabled.value = false;
    }
  };

  async function handleEditProduct(
    productId: string,
    productFormData: ProductFormSchema
  ) {
    try {
      disabled.value = true;
      const productCategory =
        categories.value?.find(
          (el) => el.id == productFormData.productCategoryId
        )?.name || "";

      const data = {
        ...productFormData,
        id: productId,
        productCategory,
        variantsDto: JSON.stringify(productFormData.colors),
        priceBeforeDiscount:
          +productFormData.price + Number(productFormData.discount || 0),
        hasDiscount:
          productFormData.hasDiscount === "Yes" &&
          Number(productFormData.discount) > 0,
        image: (productFormData.image as File)
          ? productFormData.image
          : undefined,
      };

      const formData = addObjectToFormData(data);

      // update Product
      await axiosFormData.put("/product/update-product", formData);

      toast.success("Product updated successfully");

      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      queryClient.invalidateQueries({ queryKey: ["getProduct"] });
      return true;
    } catch (err) {
      toast.error("something went wrong");
      return false;
    } finally {
      disabled.value = false;
    }
  }

  const handleDeleteProduct = async (id: number | string) => {
    try {
      disabled.value = true;
      await axiosInstance.delete(`/product/delete-product?id=${id}`);
      toast.success("Product deleted successfully");

      if (productsQuery.data.value?.data.length === 1 && pageIndex.value > 1) {
        const newPageIndex = pageIndex.value - 1;

        pageIndex.value = newPageIndex;
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "get-products" ||
            query.queryKey[0] === "getAnalytics" ||
            query.queryKey[1] === `${newPageIndex}`,
        });
        return;
      }
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "get-products" ||
          query.queryKey[0] === "getAnalytics",
      });
    } catch (err) {
      toast.error("Error deleting product");
    } finally {
      disabled.value = false;
    }
  };

  function handlePageIndexChange(index: number) {
    pageIndex.value = index;
    sessionStorage.setItem("productsIndex", String(index));
  }

  return {
    productsQuery,
    pageIndex,
    PAGE_SIZE,
    disabled,
    formMethods,
    handlePageIndexChange,
    handleDeleteProduct,
    handleAddProduct,
    handleEditProduct,
    addNewColorBox,
  };
}
