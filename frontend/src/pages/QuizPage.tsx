import React from "react";
import { useParams } from "react-router-dom";
import { useQuizQuestions } from "../hooks/quiz/useQuestions";
import { useSubmitQuiz } from "../hooks/quiz/useSubmitQuiz";
import Navigation from "../components/Navigation";
import QuestionCard from "../components/QuestionCard";
import { useQuizState } from "../utils/quizUtils";
import { Question } from "../types/QuestionType";
import "../styles/pages/Quiz.css";

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();

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

  const {
    currentQuestionIndex,
    quizCompleted,
    timeLeft,
    quizStarted,
    userAnswers,
    adminAttemptedSubmit,
    startQuiz,
    handleAnswerChange,
    handleNextQuestion,
    handleRestartQuiz,
    handleExitQuiz,
  } = useQuizState({
    questions: questions as Question[],
    quizId: quizId || "",
    questionsLoading,
    submit,
  });

  const currentQuestion = questions[currentQuestionIndex];

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
        <section className="quiz-content">
          <h1>Welcome to the Quiz!</h1>
          <div>
            <p>This quiz contains {questions.length} questions.</p>
            <p>You'll have 30 seconds to answer each question.</p>
            <p>Are you ready to begin?</p>
          </div>
          <div>
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
        </section>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="quiz-results">
        <h1>Quiz Completed!</h1>

        {adminAttemptedSubmit && (
          <div className="admin-warning">
            <p>
              As an admin, your quiz wasn't submitted. You can test the quiz
              simulation, but submissions are reserved for users.
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
                  You answered{" "}
                  {Math.round(((score ?? 0) / 100) * (questions.length || 1))}{" "}
                  out of {questions.length || 1} questions correctly!
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
      <div className="quiz-info">
        <span>
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <br />
        <span>Time left: {timeLeft}s</span>
      </div>

      <div>
        <QuestionCard
          question={currentQuestion}
          initialAnswer={userAnswers[currentQuestion?.id]}
          onAnswerChange={handleAnswerChange}
          onNext={handleNextQuestion}
          onExit={handleExitQuiz}
        />
      </div>
    </div>
  );
};

export default QuizPage;
