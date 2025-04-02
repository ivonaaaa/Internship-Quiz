import { handleRequest } from "./api";

export const fetchCategories = async () => {
  return await handleRequest("category", "GET", {});
};

export const createCategory = async (
  categoryData: { name: string; image: string },
  token: string
) => {
  return await handleRequest("category", "POST", categoryData, token);
};
