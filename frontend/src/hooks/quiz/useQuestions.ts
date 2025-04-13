import { useState, useEffect } from "react";
import { fetchQuizQuestions } from "../../services/quizApi";
import { Question } from "../../types/QuestionType";

export const useQuizQuestions = (quizId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;
    const loadQuestions = async () => {
      try {
        const data = await fetchQuizQuestions(quizId);

        if (Array.isArray(data)) setQuestions(data);
        else if (data && typeof data === "object") {
          const questionsArray = data.questions || [];
          setQuestions(Array.isArray(questionsArray) ? questionsArray : []);
        } else {
          setQuestions([]);
          setError("Invalid questions data format");
        }
      } catch (err) {
        setError("Failed to load questions!");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [quizId]);

  return { questions, loading, error };
};
