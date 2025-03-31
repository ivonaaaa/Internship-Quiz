import { useEffect, useState } from "react";
import { searchQuizzesByName } from "../../services/api";

export const useSearchQuizzes = (name: string) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setQuizzes([]);
      setLoading(false);
      return;
    }

    const searchQuizzes = async () => {
      try {
        const data = await searchQuizzesByName(name);
        setQuizzes(data);
      } catch (err) {
        setError("Failed to search quizzes!");
      } finally {
        setLoading(false);
      }
    };

    searchQuizzes();
  }, [name]);

  return { quizzes, loading, error };
};
