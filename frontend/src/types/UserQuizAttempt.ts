export type UserQuizAttempt = {
  id: string;
  score: number;
  totalQuestions: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
  quiz: {
    title: string;
  };
};
