import { useState, useEffect } from "react";
import { fetchQuizQuestions } from "../../services/quizApi";

export const useQuizQuestions = (quizId: string) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;
    const loadQuestions = async () => {
      try {
        const data = await fetchQuizQuestions(quizId);
        setQuestions(data);
      } catch (err) {
        setError("Failed to load questions!");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [quizId]);

  return { questions, loading, error };
};
