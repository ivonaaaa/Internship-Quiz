export type Question = {
  id: string;
  text: string;
  type: string;
  options?: string[];
  correctAnswer?: string | string[];
};
