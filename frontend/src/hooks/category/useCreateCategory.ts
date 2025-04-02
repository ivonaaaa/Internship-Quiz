import { useState } from "react";
import { createCategory as createCategoryApi } from "../../services/categoryApi";

const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const createCategory = async (
    categoryData: { name: string; image: string },
    token: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createCategoryApi(categoryData, token);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to create category!");
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, data, loading, error };
};

export default useCreateCategory;
