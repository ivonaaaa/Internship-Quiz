import { Box, Button } from "@mui/material";
import { Quiz } from "../types/QuizType";
import { Category } from "../types/CategoryType";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Quizzes.css";

interface QuizBoxProps {
  quiz: Quiz;
  category: Category;
}

const QuizBox: React.FC<QuizBoxProps> = ({ quiz, category }) => {
  const imagePath = `../assets/images/${category.image}`;
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <Box className="quiz-box">
      <img src={imagePath} alt={quiz.title} />
      <h3>{quiz.title}</h3>
      <Button variant="contained" color="primary" onClick={handlePlayClick}>
        Play
      </Button>
    </Box>
  );
};

export default QuizBox;
