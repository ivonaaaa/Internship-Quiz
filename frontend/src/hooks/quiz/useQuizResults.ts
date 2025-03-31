import { useState, useEffect } from "react";
import { fetchQuizResults } from "../../services/api";

export const useQuizResults = (quizId: string) => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;

    const loadQuizResults = async () => {
      try {
        const data = await fetchQuizResults(quizId);
        setQuizResults(data);
      } catch (err) {
        setError("Failed to load quiz results!");
      } finally {
        setLoading(false);
      }
    };

    loadQuizResults();
  }, [quizId]);

  return { quizResults, loading, error };
};
