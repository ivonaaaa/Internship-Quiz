import { useState, useEffect } from "react";
import { fetchUsers } from "../../services/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users!");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, loading, error };
};
