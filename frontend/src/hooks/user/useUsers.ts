import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/services/userApi";
import { User } from "../../types/UserType";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = (await fetchUsers()) as User[];
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
