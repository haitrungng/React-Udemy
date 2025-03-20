import React from "react";
import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeOut }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onTimeOut();
    }, timeout);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [onTimeOut, timeout]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setRemainingTime((prev: number) => {
        if (prev === 0) {
          clearInterval(intervalID);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
};

export default QuestionTimer;
