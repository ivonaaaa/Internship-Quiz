import { handleRequest } from "../api";

export const fetchUsers = async () => {
  return await handleRequest("user", "GET", {});
};

export const fetchAllUserQuizAttempts = async () => {
  return await handleRequest("user/results", "GET", {});
};
