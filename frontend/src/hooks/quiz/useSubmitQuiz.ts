import { useState } from "react";
import { submitQuiz } from "../../services/api";

export const useSubmitQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const submit = async (quizId: string, answers: any, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitQuiz(quizId, answers, token);
      setScore(result.score);
    } catch (err) {
      setError("Failed to submit quiz!");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, score };
};
