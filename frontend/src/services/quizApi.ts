import { handleRequest } from "./api";

export const fetchQuizzes = async () => {
  return await handleRequest("quiz", "GET", {});
};

export const fetchQuizzesByCategory = async (categoryId: string) => {
  return await handleRequest(`quiz/category/${categoryId}`, "GET", {});
};

export const fetchQuizzesByName = async (name: string) => {
  return await handleRequest(`quiz/search?name=${name}`, "GET", {});
};

export const fetchQuizQuestions = async (quizId: string) => {
  return await handleRequest(`quiz/${quizId}/questions`, "GET", {});
};

export const fetchAnswers = async (questionId: string) => {
  return await handleRequest(`quiz/${questionId}/questions/answers`, "GET", {});
};

export const fetchQuizResults = async (quizId: string) => {
  return await handleRequest(`quiz/${quizId}/results`, "GET", {});
};

export const submitQuiz = async (
  quizId: string,
  answers: any,
  token: string
) => {
  return await handleRequest(`quiz/${quizId}/submit`, "POST", answers, token);
};

export const createQuiz = async (quizData: any, token: string) => {
  return await handleRequest("quiz", "POST", quizData, token);
};
