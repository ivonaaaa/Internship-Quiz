import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../services/api";

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
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
