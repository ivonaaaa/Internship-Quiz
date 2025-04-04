import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { useQuizzes } from "../hooks/quiz/useQuizzes";
import useCreateCategory from "../hooks/category/useCreateCategory";
import useCreateQuiz from "../hooks/quiz/useCreateQuiz";
import { useCategories } from "../hooks/category/useCategories";

const AdminControls = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const {
    createCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useCreateCategory();

  const { quizzes } = useQuizzes();
  const [openQuiz, setOpenQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizCategory, setQuizCategory] = useState("");
  const [quizType, setQuizType] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const {
    createQuiz,
    loading: quizLoading,
    error: quizError,
  } = useCreateQuiz();
  const { categories } = useCategories();

  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);

  const handleSubmitCategory = async () => {
    if (!categoryName.trim() || !image.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) return;
    await createCategory({ name: categoryName, image }, token);
    setCategoryName("");
    setImage("");
    handleCloseCategory();
  };

  const handleOpenQuiz = () => setOpenQuiz(true);
  const handleCloseQuiz = () => setOpenQuiz(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleQuestionChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleSubmitQuiz = async () => {
    if (!quizTitle.trim() || !quizCategory || !quizType.trim()) return;

    const filteredQuestions = questions.filter(
      (q) => q.question.trim() && q.answer.trim()
    );

    const token = localStorage.getItem("token");
    if (!token) return;

    const quizData = {
      title: quizTitle,
      categoryId: quizCategory,
      type: quizType,
      questions: filteredQuestions,
    };

    await createQuiz(quizData, token);
    setQuizTitle("");
    setQuizCategory("");
    setQuizType("");
    setQuestions([{ question: "", answer: "" }]);
    handleCloseQuiz();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenCategory}
        >
          Add Category
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOpenQuiz}>
          Add Quiz
        </Button>
        <Button variant="contained" color="secondary">
          See Results
        </Button>
      </Box>

      <Modal open={openCategory} onClose={handleCloseCategory}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Add New Category</Typography>
          <TextField
            fullWidth
            label="Category Name"
            margin="normal"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {categoryError && (
            <Typography color="error">{categoryError}</Typography>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button onClick={handleCloseCategory} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitCategory}
              variant="contained"
              disabled={categoryLoading}
            >
              {categoryLoading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openQuiz} onClose={handleCloseQuiz}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Add New Quiz</Typography>
          <TextField
            fullWidth
            label="Quiz Title"
            margin="normal"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
            Select Quiz Category:
          </Typography>
          <Select
            fullWidth
            value={quizCategory}
            onChange={(e) => setQuizCategory(e.target.value)}
            displayEmpty
            sx={{ mt: 1 }}
          >
            <MenuItem value="">
              <em>Select a Category</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            displayEmpty
            sx={{ mt: 1 }}
          >
            <MenuItem value="">
              <em>Select a Type</em>
            </MenuItem>
            {Array.from(new Set(quizzes.map((quiz) => quiz.type))).map(
              (type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              )
            )}
          </Select>

          <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
            Questions & Answers:
          </Typography>
          {questions.map((q, index) => (
            <Box
              key={index}
              sx={{ mt: 1, border: "1px solid #ccc", p: 1, borderRadius: 1 }}
            >
              <TextField
                fullWidth
                label={`Question ${index + 1}`}
                margin="normal"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />
              <TextField
                fullWidth
                label={`Answer ${index + 1}`}
                margin="normal"
                value={q.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
              />
            </Box>
          ))}
          <Button onClick={handleAddQuestion} sx={{ mt: 2 }}>
            Add Another Question
          </Button>

          {quizError && <Typography color="error">{quizError}</Typography>}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button onClick={handleCloseQuiz} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitQuiz}
              variant="contained"
              disabled={quizLoading}
            >
              {quizLoading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminControls;
