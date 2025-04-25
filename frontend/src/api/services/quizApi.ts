import { Quiz } from "../../types/QuizType";
import { handleRequest } from "../api";

export const fetchQuizzes = async () => {
  return await handleRequest("quiz", "GET", {});
};

export const fetchQuizzesByCategory = async (
  categoryId: string
): Promise<Quiz[]> => {
  const endpoint =
    !categoryId || categoryId === "all"
      ? "quiz"
      : `quiz/category/${categoryId}`;

  return await handleRequest(endpoint, "GET");
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

export const submitQuiz = async (quizId: string, answers: any) => {
  return await handleRequest(`quiz/${quizId}/submit`, "POST", answers);
};

export const createQuiz = async (quizData: any) => {
  return await handleRequest("quiz", "POST", quizData);
};
