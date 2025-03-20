import React, { useRef } from "react";

type AnswersProps = {
  answers: string[];
  selectedAnswer: string;
  answerState: "" | "answered" | "correct" | "wrong";
  onSelectAnswer: (selectedAnswer: string) => void;
};

const Answers = ({
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
}: AnswersProps) => {
  const shuffledAnswers = useRef<string[]>();

  if (!shuffledAnswers.current || answerState === "") {
    console.log("Shuffling answers...");
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
        let CSSclasses = "";

        if (answerState === "answered" && isSelected) {
          CSSclasses = "answered";
        } else if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          CSSclasses = answerState;
        }

        return (
          <li key={index} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={CSSclasses}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
