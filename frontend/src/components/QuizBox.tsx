import { Box, Button, Typography } from "@mui/material";
import { Quiz } from "../types/QuizType";
import { Category } from "../types/CategoryType";

interface QuizBoxProps {
  quiz: Quiz;
  category: Category;
}

const QuizBox: React.FC<QuizBoxProps> = ({ quiz, category }) => {
  const imagePath = `../assets/images/${category.image}`;

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <img src={imagePath} alt={quiz.title} width="100%" height="150px" />
      <Typography variant="h6">{quiz.title}</Typography>
      <Button variant="contained" color="primary">
        Play
      </Button>
    </Box>
  );
};

export default QuizBox;
