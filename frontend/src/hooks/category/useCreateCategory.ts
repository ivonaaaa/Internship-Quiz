import { useState } from "react";
import { createCategory as createCategoryApi } from "../../api/services/categoryApi";
import { useCategories } from "./useCategories";
import { Category } from "../../types/CategoryType";

const useCreateCategory = () => {
  const { categories, setCategories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (categoryData: {
    name: string;
    image: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const newCategory = await createCategoryApi(categoryData);
      setCategories([...categories, newCategory as Category]);
    } catch (err: any) {
      setError(err.message || "Failed to create category!");
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading, error };
};

export default useCreateCategory;
