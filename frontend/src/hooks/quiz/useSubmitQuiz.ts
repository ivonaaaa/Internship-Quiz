import { useState } from "react";
import { submitQuiz } from "../../api/services/quizApi";

interface QuizSubmissionResult {
  score: number;
  userId: string;
  quizId: string;
}

export const useSubmitQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const submit = async (
    quizId: string,
    submitData: { userId: string; answers: Record<string, any> }
  ): Promise<QuizSubmissionResult> => {
    setLoading(true);
    setError(null);

    try {
      const result = (await submitQuiz(
        quizId,
        submitData
      )) as QuizSubmissionResult;
      setScore(result.score || 0);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit quiz";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, score };
};
