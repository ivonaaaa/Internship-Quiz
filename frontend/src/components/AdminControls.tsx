import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import useCreateCategory from "../hooks/category/useCreateCategory";
import useCreateQuiz from "../hooks/quiz/useCreateQuiz";
import { useCategories } from "../hooks/category/useCategories";
import { ScoresPanel } from "./ScoresPanel";

interface QuestionInput {
  question: string;
  type: "FILL_IN_THE_BLANKS" | "TRUE_FALSE" | "MULTIPLE_CHOICE";
  correctAnswer?: string;
  options?: string[];
  correctOptionIndex?: number;
}

const AdminControls = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const {
    createCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useCreateCategory();
  const [openQuiz, setOpenQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizCategory, setQuizCategory] = useState("");
  const [questions, setQuestions] = useState<QuestionInput[]>([
    { question: "", type: "FILL_IN_THE_BLANKS", correctAnswer: "" },
  ]);
  const {
    createQuiz,
    loading: quizLoading,
    error: quizError,
  } = useCreateQuiz();
  const { categories } = useCategories();
  const [openResults, setOpenResults] = useState(false);

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

  const handleCloseQuiz = () => setOpenQuiz(false);
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "FILL_IN_THE_BLANKS", correctAnswer: "" },
    ]);
  };
  const handleQuestionChange = (
    index: number,
    field: "question" | "type" | "correctAnswer",
    value: string
  ) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "type") {
      if (value === "MULTIPLE_CHOICE") {
        updated[index].options = ["", "", ""];
        updated[index].correctOptionIndex = undefined;
        updated[index].correctAnswer = undefined;
      } else if (value === "TRUE_FALSE") {
        updated[index].correctAnswer = "";
        updated[index].options = undefined;
        updated[index].correctOptionIndex = undefined;
      } else {
        updated[index].correctAnswer = "";
        updated[index].options = undefined;
        updated[index].correctOptionIndex = undefined;
      }
    }
    setQuestions(updated);
  };
  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    const currentOptions = updated[questionIndex].options || ["", "", ""];
    currentOptions[optionIndex] = value;
    updated[questionIndex].options = currentOptions;
    setQuestions(updated);
  };
  const handleCorrectOptionChange = (
    questionIndex: number,
    optionIndex: number
  ) => {
    const updated = [...questions];
    updated[questionIndex].correctOptionIndex = optionIndex;
    if (updated[questionIndex].options) {
      updated[questionIndex].correctAnswer =
        updated[questionIndex].options![optionIndex];
    }
    setQuestions(updated);
  };

  const handleSubmitQuiz = async () => {
    const validQuestions = questions.filter((q) => q.question.trim());
    if (validQuestions.length < 5) {
      alert("Please add at least 5 questions.");
      return;
    }
    const distinctTypes = new Set(questions.map((q) => q.type));
    if (distinctTypes.size < 3) {
      alert("The quiz must include at least three different question types.");
      return;
    }
    for (const [index, q] of questions.entries()) {
      if (!q.question.trim()) {
        alert(`Question ${index + 1} cannot be empty.`);
        return;
      }
      if (q.type === "FILL_IN_THE_BLANKS") {
        if (!q.correctAnswer || !q.correctAnswer.trim()) {
          alert(
            `Question ${
              index + 1
            } (Fill in the Blanks) must have a correct answer.`
          );
          return;
        }
      } else if (q.type === "TRUE_FALSE") {
        if (q.correctAnswer !== "true" && q.correctAnswer !== "false") {
          alert(
            `Question ${
              index + 1
            } (True/False) must have a correct answer selected.`
          );
          return;
        }
      } else if (q.type === "MULTIPLE_CHOICE") {
        if (!q.options || q.options.length !== 3) {
          alert(
            `Question ${
              index + 1
            } (Multiple Choice) must have exactly 3 options.`
          );
          return;
        }
        for (let i = 0; i < 3; i++) {
          if (!q.options[i].trim()) {
            alert(
              `Question ${index + 1} (Multiple Choice): Option ${
                i + 1
              } cannot be empty.`
            );
            return;
          }
        }
        if (
          q.correctOptionIndex === undefined ||
          q.correctOptionIndex < 0 ||
          q.correctOptionIndex > 2
        ) {
          alert(
            `Question ${
              index + 1
            } (Multiple Choice) must have a correct option selected.`
          );
          return;
        }
      }
    }
    if (!quizTitle.trim() || !quizCategory) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    const transformedQuestions = questions.map((q) => {
      if (q.type === "FILL_IN_THE_BLANKS") {
        return {
          text: q.question,
          type: q.type,
          answers: [{ text: q.correctAnswer!.trim(), isCorrect: true }],
        };
      } else if (q.type === "TRUE_FALSE") {
        return {
          text: q.question,
          type: q.type,
          answers: [
            { text: "true", isCorrect: q.correctAnswer === "true" },
            { text: "false", isCorrect: q.correctAnswer === "false" },
          ],
        };
      } else if (q.type === "MULTIPLE_CHOICE") {
        return {
          text: q.question,
          type: q.type,
          answers: q.options!.map((opt, i) => ({
            text: opt.trim(),
            isCorrect: i === q.correctOptionIndex,
          })),
        };
      } else {
        return {
          text: q.question,
          type: q.type,
          answers: [],
        };
      }
    });
    const quizData = {
      title: quizTitle,
      categoryId: quizCategory,
      questions: transformedQuestions,
    };
    await createQuiz(quizData, token);
    setQuizTitle("");
    setQuizCategory("");
    setQuestions([
      { question: "", type: "FILL_IN_THE_BLANKS", correctAnswer: "" },
    ]);
    handleCloseQuiz();
  };

  const handleSeeResults = () => {
    setOpenResults(true);
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
          onClick={() => setOpenCategory(true)}
        >
          Add Category
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenQuiz(true)}
        >
          Add Quiz
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSeeResults}
        >
          See Results
        </Button>
      </Box>
      <Modal open={openCategory} onClose={() => setOpenCategory(false)}>
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
            <Button onClick={() => setOpenCategory(false)} color="error">
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
      <Modal open={openQuiz} onClose={() => setOpenQuiz(false)}>
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
          <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
            Questions & Answers (Minimum 5 required):
          </Typography>
          {questions.map((q, index) => (
            <Box
              key={index}
              sx={{
                mt: 1,
                border: "1px solid #ccc",
                p: 1,
                borderRadius: 1,
                mb: 2,
              }}
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
              <Select
                fullWidth
                value={q.type}
                onChange={(e) =>
                  handleQuestionChange(index, "type", e.target.value as any)
                }
                sx={{ mt: 1 }}
              >
                <MenuItem value="FILL_IN_THE_BLANKS">
                  Fill in the Blanks
                </MenuItem>
                <MenuItem value="TRUE_FALSE">True / False</MenuItem>
                <MenuItem value="MULTIPLE_CHOICE">Multiple Choice</MenuItem>
              </Select>
              {q.type === "FILL_IN_THE_BLANKS" && (
                <TextField
                  fullWidth
                  label="Correct Answer"
                  margin="normal"
                  value={q.correctAnswer || ""}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                />
              )}
              {q.type === "TRUE_FALSE" && (
                <RadioGroup
                  row
                  value={q.correctAnswer || ""}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              )}
              {q.type === "MULTIPLE_CHOICE" && (
                <Box sx={{ mt: 1 }}>
                  {["Option 1", "Option 2", "Option 3"].map((label, i) => (
                    <TextField
                      key={i}
                      fullWidth
                      label={label}
                      margin="normal"
                      value={q.options ? q.options[i] || "" : ""}
                      onChange={(e) =>
                        handleOptionChange(index, i, e.target.value)
                      }
                    />
                  ))}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Select the correct option:
                  </Typography>
                  <RadioGroup
                    row
                    value={
                      q.correctOptionIndex !== undefined
                        ? q.correctOptionIndex.toString()
                        : ""
                    }
                    onChange={(e) =>
                      handleCorrectOptionChange(index, parseInt(e.target.value))
                    }
                  >
                    {[0, 1, 2].map((val, i) => (
                      <FormControlLabel
                        key={i}
                        value={val.toString()}
                        control={<Radio />}
                        label={`Option ${i + 1}`}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              )}
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
      <Modal open={openResults} onClose={() => setOpenResults(false)}>
        <ScoresPanel open={openResults} onClose={() => setOpenResults(false)} />
      </Modal>
    </>
  );
};

export default AdminControls;
