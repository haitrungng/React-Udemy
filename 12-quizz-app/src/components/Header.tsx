import React from "react";
import logoImg from "../assets/quiz-logo.png";

const Header = () => {
  return (
    <header>
      <img src={logoImg} alt="logo" />
      <h1>Quizz App</h1>
    </header>
  );
};

export default Header;
