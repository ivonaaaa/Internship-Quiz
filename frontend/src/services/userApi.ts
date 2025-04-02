import { handleRequest } from "./api";

export const fetchUsers = async () => {
  return await handleRequest("user", "GET", {});
};

export const fetchUserQuizAttempts = async (userId: string) => {
  return await handleRequest(`quiz/user/${userId}/attempts`, "GET", {});
};
