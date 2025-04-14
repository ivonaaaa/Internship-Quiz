import { useState, useEffect } from "react";
import { fetchAllUserQuizAttempts } from "../../services/userApi";
import { UserQuizAttempt } from "../../types/UserQuizAttempt";

export const useAllUserQuizAttempts = () => {
  const [attempts, setAttempts] = useState<UserQuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllUserQuizAttempts();
        setAttempts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  return { attempts, loading, error };
};
