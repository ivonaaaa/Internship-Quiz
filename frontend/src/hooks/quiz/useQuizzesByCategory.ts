import { useEffect, useState } from "react";
import { fetchQuizzesByCategory } from "../../services/quizApi";
import { Quiz } from "../../types/QuizType";

export const useQuizzesByCategory = (categoryId: string) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchQuizzesByCategory(categoryId);
        setQuizzes(data);
      } catch (err) {
        setError("Failed to load quizzes by category!");
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, [categoryId]);

  return { quizzes, loading, error };
};
