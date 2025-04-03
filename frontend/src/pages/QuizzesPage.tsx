import { useSearchParams } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Navigation from "../components/Navigation";
import Headline from "../components/Headline";
import QuizList from "../components/QuizList";
import AdminControls from "../components/AdminControls";
import { useQuizzes } from "../hooks/quiz/useQuizzes";
import { useCategories } from "../hooks/category/useCategories";
import { useAuth } from "../hooks/user/useAuth";
import { Quiz } from "../types/QuizType";
import "../styles/pages/Quizzes.css";

const QuizzesPage = () => {
  const { quizzes, loading, error } = useQuizzes();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const { role, user } = useAuth();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filteredQuizzes: Quiz[] = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <img
        src="/assets/images/headline-background.jpg"
        className="background-image"
      ></img>
      <Navigation />
      {user && <Headline user={user} />}{" "}
      <Box sx={{ padding: "2rem" }}>
        {role === "ADMIN" && <AdminControls />}
        <Button variant="outlined">Filter by Category</Button>

        {loading && <CircularProgress />}
        {categoriesLoading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {categoriesError && (
          <Typography color="error">{categoriesError}</Typography>
        )}

        {!loading && !categoriesLoading && !error && !categoriesError && (
          <QuizList quizzes={filteredQuizzes} categories={categories} />
        )}
      </Box>
    </>
  );
};

export default QuizzesPage;
