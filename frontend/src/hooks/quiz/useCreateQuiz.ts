import { useState } from "react";
import { createQuiz as createQuizApi } from "../../services/quizApi";

const useCreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const createQuiz = async (quizData: any, token: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createQuizApi(quizData, token);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to create quiz!");
    } finally {
      setLoading(false);
    }
  };

  return { createQuiz, data, loading, error };
};

export default useCreateQuiz;
