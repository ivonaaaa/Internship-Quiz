import { API_BASE_URL } from "../constants/constants";

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/user`);
  if (!response.ok) throw new Error("Failed to fetch users!");
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/category`);
  if (!response.ok) throw new Error("Failed to fetch categories!");
  return response.json();
};

export const fetchQuizzes = async () => {
  const response = await fetch(`${API_BASE_URL}/quiz`);
  if (!response.ok) throw new Error("Failed to fetch quizzes!");
  return response.json();
};

export const fetchQuizzesByCategory = async (categoryId: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz/category/${categoryId}`);
  if (!response.ok) throw new Error("Failed to fetch quizzes by category!");
  return response.json();
};

export const searchQuizzesByName = async (name: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz/search?name=${name}`);
  if (!response.ok) throw new Error("Failed to search quizzes by name!");
  return response.json();
};

export const fetchQuizQuestions = async (quizId: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz/${quizId}/questions`);
  if (!response.ok) throw new Error("Failed to fetch quiz questions!");
  return response.json();
};

export const fetchAnswers = async (questionId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/quiz/${questionId}/questions/answers`
  );
  if (!response.ok) throw new Error("Failed to fetch answers!");
  return response.json();
};

export const submitQuiz = async (
  quizId: string,
  answers: any,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/quiz/${quizId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(answers),
  });
  if (!response.ok) throw new Error("Failed to submit quiz!");
  return response.json();
};

export const fetchQuizResults = async (quizId: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz/${quizId}/results`);
  if (!response.ok) throw new Error("Failed to fetch quiz results!");
  return response.json();
};

export const fetchUserQuizAttempts = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz/user/${userId}/attempts`);
  if (!response.ok) throw new Error("Failed to fetch user quiz attempts!");
  return response.json();
};

export const createCategory = async (
  categoryData: { name: string; image: string },
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) throw new Error("Failed to create category!");
  return response.json();
};

export const createQuiz = async (quizData: any, token: string) => {
  const response = await fetch(`${API_BASE_URL}/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quizData),
  });
  if (!response.ok) throw new Error("Failed to create quiz!");
  return response.json();
};
