import { useState, useEffect } from "react";
import { fetchQuizzesByName } from "../../services/quizApi";

export const useQuizzesByName = (name: string) => {
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
        const data = await fetchQuizzesByName(name);
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
