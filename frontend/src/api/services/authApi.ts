import { handleRequest } from "../api";

export const loginUser = async (email: string, password: string) => {
  return await handleRequest("user/login", "POST", { email, password });
};

export const registerUser = async (email: string, password: string) => {
  return await handleRequest("user/register", "POST", { email, password });
};
