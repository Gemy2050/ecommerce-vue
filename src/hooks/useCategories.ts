import { axiosInstance } from "@/config/axios.config";
import type { ICategory } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export function useCategories() {
  const categoriesQuery = useQuery<ICategory[]>({
    queryKey: ["getAllCategories"],
    queryFn: async () =>
      (await axiosInstance.get("/category/get-all-categories")).data,
  });

  const disabled = ref(false);

  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  async function handleAddCategory(categoryName: string) {
    try {
      toast.clear();
      if (!categoryName.trim()) {
        toast.error("Please enter a category name");
        return;
      }
      disabled.value = true;
      await axiosInstance.post(
        `/category/add-category?categoryName=${categoryName}`
      );
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Category added successfully");
    } catch (error) {
      toast.error("error adding category");
    } finally {
      categoryName = "";
      disabled.value = false;
    }
  }

  async function handleEditCategory(
    catId: string | number,
    categoryName: string
  ) {
    try {
      toast.clear();
      if (!categoryName.trim()) {
        toast.error("Please enter a category name");
        return;
      }
      disabled.value = true;
      await axiosInstance.put(
        `/category/update-category?id=${catId}&categoryName=${categoryName}`
      );
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Category updated successfully");
      router.push("..");
    } catch (error) {
      toast.error("error updating category");
    } finally {
      disabled.value = false;
    }
  }

  const handleDeleteCategory = async (catId: string | number) => {
    try {
      toast.clear();
      disabled.value = true;
      await axiosInstance.delete(`/category/delete-category?id=${catId}`);
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      disabled.value = false;
    }
  };

  return {
    categoriesQuery,
    disabled,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
  };
}
