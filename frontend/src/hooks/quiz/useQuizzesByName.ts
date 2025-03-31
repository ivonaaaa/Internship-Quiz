import { useState, useEffect } from "react";
import { searchQuizzesByName } from "../../services/api";

export const useQuizzesByName = (name: string) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const data = await searchQuizzesByName(name);
        setQuizzes(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (name) search();
  }, [name]);

  return { quizzes, loading, error };
};
