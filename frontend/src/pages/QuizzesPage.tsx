import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import Navigation from "../components/Navigation";
import Headline from "../components/Headline";
import QuizList from "../components/QuizList";
import AdminControls from "../components/AdminControls";
import { useQuizzes } from "../hooks/quiz/useQuizzes";
import { useQuizzesByCategory } from "../hooks/quiz/useQuizzesByCategory";
import { useCategories } from "../hooks/category/useCategories";
import { useAuth } from "../hooks/user/useAuth";
import { Quiz } from "../types/QuizType";
import {
  filterQuizzesBySearchQuery,
  getQuizzesToShow,
  handleCategorySelection,
} from "../utils/quizzesUtils";
import "../styles/pages/Quizzes.css";

const QuizzesPage = () => {
  const { role, user } = useAuth();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("category") || "";
  const {
    quizzes: allQuizzes,
    loading: loadingAll,
    error: errorAll,
  } = useQuizzes();
  const {
    quizzes: categoryQuizzes,
    loading: loadingCategory,
    error: errorCategory,
  } = useQuizzesByCategory(categoryId);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (categoryId?: string) => {
    handleCategorySelection(setAnchorEl, setSearchParams, categoryId);
  };

  const quizzesToShow: Quiz[] = getQuizzesToShow(
    categoryId,
    categoryQuizzes,
    allQuizzes
  );

  const filteredQuizzes: Quiz[] = filterQuizzesBySearchQuery(
    quizzesToShow,
    searchQuery
  );

  const isLoading = categoryId ? loadingCategory : loadingAll;
  const isError = categoryId ? errorCategory : errorAll;

  return (
    <>
      <img
        src="/assets/images/headline-background.jpg"
        className="background-image"
      />
      <Navigation />
      {user && <Headline user={user} />}
      <Box sx={{ padding: "2rem" }}>
        {role === "ADMIN" && <AdminControls />}

        <Button
          variant="outlined"
          sx={{ margin: "20px" }}
          onClick={handleClick}
        >
          Filter by Category
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
          <MenuItem onClick={() => handleClose(undefined)}>All</MenuItem>
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => handleClose(category.id)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>

        {isLoading && <CircularProgress />}
        {categoriesLoading && <CircularProgress />}
        {isError && <Typography color="error">{isError}</Typography>}
        {categoriesError && (
          <Typography color="error">{categoriesError}</Typography>
        )}

        {!isLoading &&
          !categoriesLoading &&
          !isError &&
          !categoriesError &&
          (filteredQuizzes.length > 0 ? (
            <QuizList quizzes={filteredQuizzes} categories={categories} />
          ) : (
            <Typography>No quizzes available for this category.</Typography>
          ))}
      </Box>
    </>
  );
};

export default QuizzesPage;
