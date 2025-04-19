import { Quiz } from "../types/QuizType";
import { SetURLSearchParams } from "react-router-dom";

export interface CategoryMenuItem {
  id: string;
  name: string;
}

export const getQuizzesToShow = (
  categoryId: string | null,
  categoryQuizzes: Quiz[],
  allQuizzes: Quiz[]
): Quiz[] => {
  if (categoryId && categoryQuizzes.length > 0) {
    return categoryQuizzes;
  } else if (!categoryId) {
    return allQuizzes;
  }
  return [];
};

export const handleCategorySelection = (
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  setSearchParams: SetURLSearchParams,
  categoryId?: string
): void => {
  setAnchorEl(null);
  if (categoryId) {
    setSearchParams({ category: categoryId });
  } else {
    setSearchParams({});
  }
};

export const filterQuizzesBySearchQuery = (
  quizzes: Quiz[],
  searchQuery: string
): Quiz[] => {
  return quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
