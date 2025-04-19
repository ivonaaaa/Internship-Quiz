import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Question } from "../types/QuestionType";

export interface QuizStateProps {
  questions: Question[];
  quizId: string;
  questionsLoading: boolean;
  submit: (quizId: string, data: any, token: string) => Promise<void>;
}

export const useQuizState = ({
  questions,
  quizId,
  questionsLoading,
  submit,
}: QuizStateProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [adminAttemptedSubmit, setAdminAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (!quizStarted || quizCompleted || questionsLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, currentQuestionIndex, questionsLoading]);

  useEffect(() => {
    setTimeLeft(30);
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && selectedAnswer !== null) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer,
      }));
    }

    if (currentQuestionIndex < questions.length - 1)
      setCurrentQuestionIndex((prev) => prev + 1);
    else handleQuizSubmit();
  };

  const handleQuizSubmit = async () => {
    setQuizCompleted(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found!");

      const decodedToken: { id: string; role: string } = jwtDecode(token);
      const userId = decodedToken.id;
      if (!userId) throw new Error("User ID not found in token!");

      const userRole = decodedToken.role;
      if (userRole === "ADMIN") {
        setAdminAttemptedSubmit(true);
        return;
      }

      const submitData = {
        userId,
        answers: userAnswers,
      };

      await submit(quizId, submitData, token);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers({});
    setQuizCompleted(false);
    setTimeLeft(30);
    setQuizStarted(false);
  };

  const navigate = useNavigate();
  const handleExitQuiz = () => {
    navigate("/");
  };

  return {
    currentQuestionIndex,
    quizCompleted,
    timeLeft,
    quizStarted,
    userAnswers,
    adminAttemptedSubmit,
    startQuiz,
    handleAnswerChange,
    handleNextQuestion,
    handleQuizSubmit,
    handleRestartQuiz,
    handleExitQuiz,
  };
};
