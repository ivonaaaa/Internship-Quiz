import { useState, useEffect } from "react";
import { fetchCategories } from "../../api/services/categoryApi";
import { Category } from "../../types/CategoryType";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data as Category[]);
      } catch (err) {
        setError("Failed to load categories!");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return { categories, setCategories, loading, error };
};
