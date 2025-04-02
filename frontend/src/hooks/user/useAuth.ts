import { useState } from "react";
import { handleRequest } from "../../services/api";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await handleRequest("user/login", "POST", {
        email,
        password,
      });
      const { token } = data;
      localStorage.setItem("token", token);
      return { success: true, token };
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");

      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await handleRequest("user/register", "POST", {
        email,
        password,
      });
      const { token } = data;
      localStorage.setItem("token", token);
      return { success: true, token };
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { login, register, error, loading };
};
