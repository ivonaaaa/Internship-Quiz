import { useState, useEffect } from "react";
import { fetchAnswers } from "../../services/api";

export const useAnswers = (questionId: string) => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!questionId) return;

    const loadAnswers = async () => {
      try {
        const data = await fetchAnswers(questionId);
        setAnswers(data);
      } catch (err) {
        setError("Failed to load answers!");
      } finally {
        setLoading(false);
      }
    };

    loadAnswers();
  }, [questionId]);

  return { answers, loading, error };
};
