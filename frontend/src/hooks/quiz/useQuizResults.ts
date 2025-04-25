import { useState, useEffect } from "react";
import { fetchQuizResults } from "../../api/services/quizApi";
import { QuizResult } from "../../types/QuizResultType";

export const useQuizResults = (quizId: string) => {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;

    const loadQuizResults = async () => {
      try {
        const data = await fetchQuizResults(quizId);

        if (Array.isArray(data)) setQuizResults(data);
        else setError("Invalid quiz results data format");
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
