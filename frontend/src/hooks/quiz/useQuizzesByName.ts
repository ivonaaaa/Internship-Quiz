import { useState, useEffect } from "react";
import { fetchQuizzesByName } from "../../api/services/quizApi";
import { Quiz } from "../../types/QuizType";

export const useQuizzesByName = (name: string) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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
        const data = (await fetchQuizzesByName(name)) as Quiz[];
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
