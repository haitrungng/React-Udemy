import React, { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions";

// @ts-ignore
import trophyIcon from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answerState, setAnswerState] = useState<
    "" | "answered" | "correct" | "wrong"
  >("");
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer: string) => {
      setAnswerState("answered");
      setUserAnswers((prev) => [...prev, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        console.log("Checking answer...", answerState);

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer("");
  }, [handleSelectAnswer]);

  if (quizIsCompleted)
    return (
      <div id="summary">
        <img src={trophyIcon} alt="Trophy" />
        <h2>Quiz Completed!</h2>
      </div>
    );

  return (
    <div id="quiz">
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={6000}
        onTimeOut={handleSkipAnswer}
      />
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          answerState={answerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answers={QUESTIONS[activeQuestionIndex].answers}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;
