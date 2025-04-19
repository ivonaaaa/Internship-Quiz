import { Box, Typography } from "@mui/material";
import QuizBox from "./QuizBox";
import { Quiz } from "../types/QuizType";
import { Category } from "../types/CategoryType";

interface QuizListProps {
  quizzes: Quiz[];
  categories: Category[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, categories }) => {
  return (
    <Box className="quiz-list">
      {quizzes.map((quiz) => {
        const category = categories.find((cat) => cat.id === quiz.categoryId);

        if (!category) {
          console.error(`Category not found for quiz with id: ${quiz.id}`);
          return (
            <Box key={quiz.id}>
              <Typography variant="body2">Category not found</Typography>
            </Box>
          );
        }

        return <QuizBox key={quiz.id} quiz={quiz} category={category} />;
      })}
    </Box>
  );
};

export default QuizList;
