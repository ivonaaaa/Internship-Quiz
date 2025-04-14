import React, { useState, useEffect } from "react";
import { useAnswers } from "../hooks/quiz/useAnswers";

interface QuestionCardProps {
  question: any;
  onAnswerChange: (questionId: string, answer: any) => void;
  onNext: () => void;
  onExit: () => void;
  initialAnswer?: any;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswerChange,
  onNext,
  onExit,
  initialAnswer,
}) => {
  const { answers, loading, error } = useAnswers(question?.id);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(
    initialAnswer || null
  );

  useEffect(() => {
    setSelectedAnswer(initialAnswer || null);
  }, [question.id]);

  useEffect(() => {
    if (selectedAnswer !== null) {
      onAnswerChange(question.id, selectedAnswer);
    }
  }, [selectedAnswer]);

  const handleAnswerChange = (answer: any) => {
    setSelectedAnswer(answer);
  };

  if (!question) return null;
  if (loading) return <div>Loading answer options...</div>;
  if (error) return <div>Error loading answer options: {error}</div>;

  const renderOptions = () => {
    if (question.type === "TRUE_FALSE") {
      return ["true", "false"].map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerChange(option)}
          style={{
            margin: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: selectedAnswer === option ? "#add8e6" : "#f0f0f0",
            color: selectedAnswer === option ? "#000" : "#333",
            fontWeight: selectedAnswer === option ? "bold" : "normal",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {option.toUpperCase()}
        </button>
      ));
    }

    if (question.type === "MULTIPLE_CHOICE") {
      const questionAnswers = answers.filter(
        (option: any) => option.questionId === question.id
      );

      return questionAnswers.map((option: any) => (
        <button
          key={option.id}
          onClick={() => handleAnswerChange(option.id)}
          style={{
            margin: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor:
              selectedAnswer === option.id ? "#add8e6" : "#f0f0f0",
            color: selectedAnswer === option.id ? "#000" : "#333",
            fontWeight: selectedAnswer === option.id ? "bold" : "normal",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <div>{option.text}</div>
        </button>
      ));
    }

    if (question.type === "FILL_IN_THE_BLANKS") {
      return (
        <input
          type="text"
          value={selectedAnswer || ""}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
        />
      );
    }

    return null;
  };

  return (
    <div>
      <h2>{question.text}</h2>
      <div>{renderOptions()}</div>

      <div>
        <button onClick={onExit}>Exit Quiz</button>
        <button onClick={onNext} disabled={!selectedAnswer}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
