import { useEffect, useState } from "react";
import { handleRequest } from "../../services/api";
import { UserPayload } from "../../types/UserType";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../../utils/authUtils";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        const decoded: UserPayload = jwtDecode(token);
        setUser(decoded);
        setRole(decoded.role);
      }
    }
  }, []);

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

      const decoded: UserPayload = jwtDecode(token);
      localStorage.setItem("role", decoded.role);
      setRole(decoded.role);
      setUser(decoded);

      return { success: true, token, role: decoded.role };
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred!");

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

      const decoded: UserPayload = jwtDecode(token);
      localStorage.setItem("role", decoded.role);
      setRole(decoded.role);
      setUser(decoded);

      return { success: true, token, role: decoded.role };
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
  };

  const getRole = () => {
    return localStorage.getItem("role");
  };

  return { login, register, logout, getRole, error, loading, role, user };
};
