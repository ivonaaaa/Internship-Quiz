import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuizQuestions } from "../hooks/quiz/useQuestions";
import { useSubmitQuiz } from "../hooks/quiz/useSubmitQuiz";
import Navigation from "../components/Navigation";
import QuestionCard from "../components/QuestionCard";
import { jwtDecode } from "jwt-decode";

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const {
    questions,
    loading: questionsLoading,
    error: questionsError,
  } = useQuizQuestions(quizId || "");
  const {
    submit,
    loading: submitting,
    error: submitError,
    score,
  } = useSubmitQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [adminAttemptedSubmit, setAdminAttemptedSubmit] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

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
      if (userRole === "ADMIN") setAdminAttemptedSubmit(true);

      const submitData = {
        userId,
        answers: userAnswers,
      };

      await submit(quizId || "", submitData, token);
    } catch (error) {
      console.error("Error handling quiz submission:", error);
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

  const handleExitQuiz = () => {
    navigate("/");
  };

  if (questionsError) {
    return (
      <div role="alert">
        <strong>Error: </strong>
        <span>{questionsError}</span>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div>
        <Navigation />
        <h1>Welcome to the Quiz!</h1>
        <div>
          <p>This quiz contains {questions.length} questions.</p>
          <p>You'll have 30 seconds to answer each question.</p>
          <p>Are you ready to begin?</p>
        </div>
        <div>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div>
        <h1>Quiz Completed!</h1>

        {adminAttemptedSubmit && (
          <div>
            <p>
              As an admin, your quiz wasn't submitted. You can test the quizzes
              and see your scores, but submissions are reserved for users.
            </p>
          </div>
        )}

        {submitError ? (
          <div>Error submitting quiz: {submitError}</div>
        ) : submitting ? (
          <p>Submitting your answers...</p>
        ) : (
          <div>
            {score !== null && (
              <div>
                <div>Your score: {score}%</div>
                <p>
                  You answered {Math.round((score / 100) * questions.length)}{" "}
                  out of {questions.length} questions correctly!
                </p>
              </div>
            )}
          </div>
        )}

        <div>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
          <button onClick={handleExitQuiz}>Exit Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div>
        <span>
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <br />
        <span>Time left: {timeLeft}s</span>
      </div>

      <div>
        <QuestionCard
          question={currentQuestion}
          initialAnswer={userAnswers[currentQuestion.id]}
          onAnswerChange={handleAnswerChange}
          onNext={handleNextQuestion}
          onExit={handleExitQuiz}
        />
      </div>
    </div>
  );
};

export default QuizPage;
