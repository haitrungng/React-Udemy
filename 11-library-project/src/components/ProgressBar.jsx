import React from "react";
import { useState, useEffect } from "react";

const TIMER = 3000;

const ProgressBar = () => {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log("SET INTERVAL");
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => clearInterval(intervalID);
  }, []);

  return <progress max={TIMER} value={remainingTime} />;
};

export default ProgressBar;
