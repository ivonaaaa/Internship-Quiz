import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../api/services/quizApi";
import { Quiz } from "../../types/QuizType";

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = (await fetchQuizzes()) as Quiz[];
        setQuizzes(data);
      } catch (err) {
        setError("Failed to load quizzes!");
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  return { quizzes, loading, error };
};
