export type Routes = {
  [key: string]: string;
};

export const routes: Routes = {
  LOGIN: "/login",
  REGISTER: "/register",
  QUIZZES: "/",
  QUIZ: "/quiz/:quizId",
  NOT_FOUND: "*",
};
