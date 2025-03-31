import { useState, useEffect } from "react";
import { fetchUserQuizAttempts } from "../../services/api";

export const useUserQuizAttempts = (userId: string) => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);
        const data = await fetchUserQuizAttempts(userId);
        setAttempts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchAttempts();
  }, [userId]);

  return { attempts, loading, error };
};
